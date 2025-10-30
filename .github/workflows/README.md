# Hybrid CI/CD Workflow

This document explains the hybrid CI/CD approach that combines GitHub-hosted runners with self-hosted infrastructure.

## Overview

The hybrid CI/CD workflow splits the test workload across different compute resources to optimize runtime and cost:

**Traditional approach**: All 8 test configurations run serially on a single VM

- Runtime: ~145 minutes

**Hybrid approach**: Splits workload by GPU requirements

- **CPU tests** (4 configs): Run in parallel on GitHub-hosted runners → ~25 minutes
- **GPU tests** (4 configs): Run serially on self-hosted VM → ~70 minutes
- **Total runtime**: ~70 minutes (50% improvement)

## Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Actions                           │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ CPU Tests (Parallel on GitHub Runners)                │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ Runner 1: Debug + PROTEGO=true     ─┐                 │ │
│  │ Runner 2: Debug + PROTEGO=false    ─┤ ~25 min        │ │
│  │ Runner 3: Release + PROTEGO=true   ─┤ (parallel)      │ │
│  │ Runner 4: Release + PROTEGO=false  ─┘                 │ │
│  │                                                        │ │
│  │ - Pulls image from GHCR                               │ │
│  │ - Checks out code including submodules                │ │
│  │ - Builds project                                      │ │
│  │ - Runs all tests                                      │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ GPU Tests (Serial on Self-Hosted VM)                  │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ VM: Debug + GPU + PROTEGO=true    ─┐                  │ │
│  │ VM: Debug + GPU + PROTEGO=false   ─┤ ~70 min         │ │
│  │ VM: Release + GPU + PROTEGO=true  ─┤ (serial)         │ │
│  │ VM: Release + GPU + PROTEGO=false ─┘                  │ │
│  │                                                        │ │
│  │ - Uses cached Docker image on VM                      │ │
│  │ - Runs inside Docker containers                       │ │
│  │ - Executes via SSH to VM                              │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Workflow Files

### ci-cd-pipeline.yaml (Current - Hybrid Approach)

- **Runtime**: ~70 minutes
- **CPU tests**: Run in parallel on GitHub-hosted runners (4 configs)
- **GPU tests**: Run serially on self-hosted VM (4 configs)
- **Triggered by**: Pull requests and pushes to main branch

### ci-cd-pipeline-old.yaml.bak (Legacy - Backup)

- **Runtime**: ~145 minutes
- **All tests**: Run serially on self-hosted VM (8 configs)
- **Status**: Kept as backup, will be removed after hybrid workflow proves stable

## Testing the Workflow

### Verifying a New Branch

When testing changes to the CI/CD workflow:

```bash
# Create test branch
git checkout -b test-ci-changes

# Push to trigger workflow
git push origin test-ci-changes
```

Monitor the workflow execution via GitHub Actions tab.

### Validation Checklist

Verify that:

- ✅ All CPU configs complete in parallel (~25 min)
- ✅ All GPU configs complete serially (~70 min)
- ✅ All test suites pass (material, utils, unit, regression, GUI)
- ✅ Code coverage uploads successfully
- ✅ No security violations (no closed-source code exposed)

## How It Works

### CPU Tests (GitHub-Hosted Runners)

1. **Image Pull**: Runners pull pre-built Docker image from GHCR (~3-5 min)
   - Contains: Ubuntu base, build tools, pre-compiled dependencies (Trilinos, Kokkos)
   - Does NOT contain: Closed-source submodule code

2. **Checkout**: GitHub Actions checks out repository code
   - Includes submodules based on build configuration
   - Code checked out to `$GITHUB_WORKSPACE`

3. **Build**: Compiles project (~5-7 min)
   - Dependencies already in Docker image (reduces build time)
   - Uses all available cores (`nproc --all`)

4. **Test**: Runs all test suites (~15 min)
   - Material tests
   - Utils modules tests
   - Unit tests (serial and parallel with MPI)
   - Regression tests (serial and parallel)
   - GUI tests (when applicable)

### GPU Tests (Self-Hosted VM)

Executes on VM with GPU support:

- Uses existing reusable actions (build-action, test actions)
- Runs inside Docker containers via SSH
- Serial execution (single VM constraint)
- Leverages cached Docker images for faster startup

## Cost Analysis

### Traditional Approach

- Self-hosted VM: ~145 min runtime per workflow

### Hybrid Approach

- GitHub-hosted runners: Free for public repositories
- Self-hosted VM: ~70 min runtime per workflow (52% reduction)
- GHCR storage: Free for public packages
- Data transfer: Free within GitHub infrastructure

**Cost savings**: ~50% reduction in self-hosted VM runtime

## Troubleshooting

### Image Pull is Slow

If GitHub runners take >10 minutes to pull Docker images, Docker layer caching can help reduce pull times.

### Submodule Checkout Failures

Verify that:

- `SSH_PRIVATE_KEY` secret is configured in repository settings
- SSH key has appropriate permissions to access private submodules
- Git authentication is properly configured in workflow

### Build Failures in Container

Common issues:

- Verify code paths: Code should be in `$GITHUB_WORKSPACE`, not the container's internal directories
- Ensure Spack environment is activated before build commands
- Check that all required environment variables are set

### Tests Fail Only on GitHub Runners

GitHub-hosted runners have resource constraints:

- 2-4 CPUs
- 7 GB RAM
- 14 GB SSD storage

If tests require more resources:

- Consider using larger GitHub runners (requires billing)
- Move resource-intensive tests to self-hosted infrastructure
- Reduce test parallelism for GitHub-hosted runners

### MPI Tests Failing

Common MPI issues in containers:

- Ensure `OMPI_ALLOW_RUN_AS_ROOT=1` is set (containers run as root)
- Set `PRTE_MCA_rmaps_default_mapping_policy=:oversubscribe` to allow more processes than physical cores
- Disable shared memory transport with `OMPI_MCA_btl=^sm` to avoid container restrictions

## Monitoring

### View Workflow Runs

Monitor CI/CD workflow execution through the GitHub Actions tab in the repository.

### Check Image Statistics

GitHub provides package metrics:

- Navigate to repository packages section
- Select the package
- View activity and download statistics

### Compare Workflow Performance

Use GitHub CLI to analyze workflow runtimes:

```bash
# View recent workflow runs
gh run list --workflow=ci-cd-pipeline.yaml --limit 10

# Compare with old workflow (if backup exists)
gh run list --workflow=ci-cd-pipeline-old.yaml.bak --limit 10
```

## Rollback Procedure

If issues arise with the hybrid workflow:

1. **Using Git revert**:

   ```bash
   git revert <commit-hash>
   git push
   ```

2. **Manual restoration** (if backup exists):
   - Restore the backup workflow file
   - Commit and push changes

**Note**: Docker images in GHCR remain available and can be reused when ready to retry the hybrid approach.

## Future Enhancements

### Parallel GPU Testing

Setting up multiple GPU-enabled VMs as self-hosted runners:

- **Benefit**: All 8 configs run in parallel (~25 min total runtime)
- **Tradeoff**: Increased infrastructure costs (multiple VMs)

### Larger GitHub Runners

Using paid larger GitHub runners for CPU tests:

- **Benefit**: Faster builds and more parallel test execution
- **Cost**: Approximately $0.008/minute for 4-core runners
- **Use case**: When 2-CPU runners are insufficient

### Enhanced Caching

Implementing aggressive caching strategies:

- Docker layer caching to speed up image pulls
- Spack build artifact caching
- Test data caching for regression tests

**Potential improvement**: Reduce setup time from 5 minutes to ~1 minute

## Security Considerations

### Docker Image Safety

Docker images pushed to GHCR must not contain closed-source code:

- Automated checks verify no source files from private submodules
- Build script (`build_and_push_images.sh`) includes safety validations
- Images contain only: base OS, build tools, and pre-compiled open-source dependencies

### Token Security

**Personal Access Tokens (PAT)**:

- Use minimal required scopes (`write:packages`, `read:packages`)
- Set expiration dates (recommended: 90 days or less)
- Rotate tokens periodically
- Never commit tokens to version control

**GitHub Secrets**:

- Store sensitive credentials in GitHub Secrets (encrypted at rest)
- Secrets are automatically redacted in workflow logs
- Use `GITHUB_TOKEN` for CI/CD when possible (auto-expires after workflow)

### Access Control

- Only repository collaborators and authorized workflows can push to GHCR
- Package visibility inherits from repository (public repo → public package)
- Review package settings periodically to verify access permissions

### Incident Response

If a security issue is discovered:

1. **Token compromise**: Immediately revoke token, check audit logs, create new token
2. **Accidental code exposure**: Delete affected image from GHCR, audit who pulled it
3. **Unauthorized access**: Review GitHub security logs, rotate all credentials

## Common Questions

**Q: Why not run GPU tests on GitHub-hosted runners?**
A: GitHub-hosted runners don't have GPU support. GPU tests require self-hosted infrastructure with GPU-enabled VMs.

**Q: Can I trigger workflows manually?**
A: Yes, use `workflow_dispatch` trigger to manually run workflows from the GitHub Actions tab.

**Q: What happens when Docker images are updated?**
A: Rebuild and push to GHCR with the same tag. Workflows automatically pull the latest version on next run.

**Q: How is closed-source code protected?**
A: Docker images never contain private submodule source code. Code is checked out at runtime within GitHub Actions, never baked into images.

**Q: What are the costs?**
A: For public repositories: GitHub-hosted runners are free, GHCR storage is free. Only self-hosted VM incurs costs (reduced by ~50% with hybrid approach).
