# GitHub Container Registry (GHCR) Setup Guide

This guide explains how to set up and use GitHub Container Registry (GHCR) for Docker images in CI/CD workflows.

## What is GHCR?

GitHub Container Registry (GHCR) is a container registry service provided by GitHub:

- Free for public repositories (unlimited storage and bandwidth)
- Integrated with GitHub (no separate account needed)
- Fast image pulls from GitHub Actions (same datacenter)
- Supports large images (multi-GB images are fine)

## One-Time Setup

### Step 1: Create a Personal Access Token (PAT)

1. Navigate to GitHub Settings: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Provide a descriptive name (e.g., `project-ghcr-token`)
4. Select required scopes:
   - ✅ `write:packages` - Upload containers
   - ✅ `read:packages` - Download containers
   - ✅ `delete:packages` - Delete containers (optional)
5. **Set expiration date**: Recommended 90 days or less for security
6. Click **"Generate token"**
7. **Copy the token immediately** - it will only be shown once

**Security Note**: Store the token securely. Never commit tokens to version control.

### Step 2: Login to GHCR on Build Machine

On the machine that will push images (e.g., development VM):

```bash
# Replace <YOUR_TOKEN> and <YOUR_USERNAME> with actual values
echo "<YOUR_TOKEN>" | docker login ghcr.io -u <YOUR_USERNAME> --password-stdin
```

Expected output:

```text
Login Succeeded
```

This saves credentials to `~/.docker/config.json`. The login persists until the token expires.

### Step 3: Configure GitHub Actions

Add the PAT as a repository secret for CI/CD workflows:

1. Navigate to repository settings: `https://github.com/<username>/<repo>/settings/secrets/actions`
2. Click **"New repository secret"**
3. Name: `GHCR_TOKEN`
4. Value: Paste the PAT
5. Click **"Add secret"**

**Alternative**: For most CI/CD use cases, the built-in `GITHUB_TOKEN` can be used instead of a PAT. It auto-expires after each workflow run and requires no manual setup.

## Building and Pushing Images

### Option 1: Build and Push in One Command

```bash
cd ~/aperi-mech/docker

# Build and push CPU image
./build_and_push_images.sh --push

# Build and push GPU image
./build_and_push_images.sh --gpu --push
```

The script will:

1. Build the Docker image
2. Check for protego source code (safety check)
3. Tag for GHCR
4. Push to `ghcr.io/aperijake/aperi-mech:latest` (or `:cuda-t4` for GPU)

### Option 2: Build First, Then Push

```bash
# Build locally first
./build_and_push_images.sh

# Test the image
docker run -it aperi-mech:latest bash

# Push when ready
./build_and_push_images.sh --push
```

### Dry Run (See What Would Be Pushed)

```bash
./build_and_push_images.sh --push --dry-run
```

## Safety Checks

The script automatically checks for protego source code before pushing:

- ✅ Checks if `protego-mech/src` directory exists in image
- ✅ Checks for `.cpp` and `.h` files in protego-mech
- ✅ Warns if built with `--protego` flag
- ❌ Refuses to push if closed-source code detected

### What Gets Pushed (Safe):

```
Image built without --protego:
├── Ubuntu 24.04 base
├── Build tools (gcc, cmake, etc.)
├── Trilinos, Kokkos, CUDA (pre-built)
├── aperi-mech source code (public)
└── Spack environment
```

### What Does NOT Get Pushed:

```
❌ protego-mech source code
❌ protego-mech headers
❌ Any closed-source algorithms
```

**Note**: Compiled binaries from protego would be in the image IF built with `--protego`, but we don't do that for pushed images.

## Using Images in CI/CD

### Pull in GitHub Actions

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    container:
      image: ghcr.io/aperijake/aperi-mech:latest
      credentials:
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    steps:
      - uses: actions/checkout@v4
      # Image already has build environment
```

### Pull on Any Machine

```bash
# Public images (no login required if repo is public)
docker pull ghcr.io/aperijake/aperi-mech:latest
docker pull ghcr.io/aperijake/aperi-mech:cuda-t4

# Run the image
docker run -it ghcr.io/aperijake/aperi-mech:latest bash
```

## Managing Images

### View Your Published Images

Visit: https://github.com/aperijake?tab=packages

### Delete Old Images

```bash
# Delete a specific tag
docker rmi ghcr.io/aperijake/aperi-mech:old-tag

# On GHCR (via web UI)
# Go to: https://github.com/aperijake/aperi-mech/packages
# Click on package → Package settings → Delete package
```

### Update an Image

Just push with the same tag:

```bash
./build_and_push_images.sh --push
```

This overwrites the `latest` tag with the new image.

## Image Visibility

By default, packages inherit visibility from the repository:

- Public repo → Public package (free, unlimited storage)
- Private repo → Private package

To change package visibility:

1. Go to https://github.com/aperijake?tab=packages
2. Click on the package
3. Package settings → Change visibility

## Troubleshooting

### "authentication required" when pushing

```bash
# Re-login to GHCR
docker login ghcr.io -u aperijake
# Enter your PAT when prompted
```

### "denied: permission_denied" error

- Check that your PAT has `write:packages` scope
- Make sure you're logged in: `docker login ghcr.io`

### Image too large / slow upload

- This is normal for 6-15GB images
- First push takes time, subsequent pushes are faster (layer caching)
- Consider compressing layers if it's an issue

### Want to test locally first

```bash
# Build without pushing
./build_and_push_images.sh

# Test the image
docker run -it aperi-mech:latest bash

# Push when satisfied
./build_and_push_images.sh --push
```

## Cost

- **Public packages**: Free, unlimited storage and bandwidth
- **Private packages**: Free up to 500MB, then approximately $0.008/GB/month

For public repositories, GHCR usage is **free**.

## Security Best Practices

### Token Management

**DO**:

- ✅ Set token expiration dates (90 days or less recommended)
- ✅ Use minimal required scopes (`write:packages`, `read:packages`)
- ✅ Store tokens securely in GitHub Secrets or password managers
- ✅ Rotate tokens periodically
- ✅ Name tokens descriptively to track usage

**DON'T**:

- ❌ Commit tokens to git repositories
- ❌ Echo tokens in scripts or logs
- ❌ Share tokens across multiple projects
- ❌ Grant excessive permissions (like `repo` scope)

### Image Content Safety

Before pushing images:

- Verify no closed-source code is included
- Review file contents: `docker run -it <image> bash`
- Use automated safety checks (provided in `build_and_push_images.sh`)
- Test images locally before pushing to registry

### Access Control

- Review package visibility settings (public vs private)
- Audit package access permissions regularly
- Restrict package access to specific repositories if needed
- Monitor package activity for unauthorized pushes

### Token Rotation

Establish a token rotation schedule:

1. Create new PAT with same permissions
2. Update Docker login on build machines
3. Update GitHub Secrets in repositories
4. Delete old PAT from GitHub settings
5. Document rotation date for next cycle

### Incident Response

If a token is compromised:

1. **Immediately revoke** the token at https://github.com/settings/tokens
2. **Check audit logs** for unauthorized activity
3. **Delete suspicious images** if any were pushed
4. **Create new token** with updated security measures
5. **Update all systems** using the old token

### Monitoring

Regularly check:

- Package activity and download statistics
- GitHub security logs for unusual access patterns
- Token expiration dates
- Image content for unintended files

## Next Steps

After completing GHCR setup:

1. Build and test images locally
2. Push images to GHCR
3. Configure CI/CD workflows to pull from GHCR
4. Verify workflows execute successfully
5. Monitor performance and establish maintenance schedule
