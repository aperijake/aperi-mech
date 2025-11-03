# Azure GPU VM Pool Guide

Complete guide for setting up and managing a pool of 3 Azure GPU VMs for parallel CI/CD testing.

## Quick Reference

**Current Setup**: 3× Standard_NC4as_T4_v3 VMs (4 vCPUs, 28GB RAM, 1× NVIDIA T4 GPU each)

**Cost**: ~\$20-24/month (includes \$7.20/month for persistent OS disks)

**Performance**: ~25-35 min runtime (50% faster than single VM)

### Common Commands

```bash
# List all VMs and their status
az vm list -d --resource-group APERIAZUREGPU_GROUP --output table

# Start a VM (workflow does this automatically)
az vm start --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3

# Stop/deallocate a VM to save costs
az vm deallocate --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3

# Get current dynamic IP
VM_IP=$(az vm show -d --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3 --query publicIps -o tsv)

# SSH to VM
ssh -i ~/.ssh/AperiAzureGPU2_key.pem azureuser@$VM_IP
```

---

## Architecture Overview

### How the VM Pool Works

The CI/CD workflow distributes GPU tests across 3 VMs running in parallel:

1. **setup-gpu** job: Starts all 3 VMs simultaneously (~3 min)
2. **get-vm-ips** job: Queries dynamic IPs for all running VMs
3. **build-and-test-gpu** job: Distributes 4 test configurations across 3 VMs:
   - VM 1: Debug+Protego=true, Release+Protego=false (2 configs, runs serially)
   - VM 2: Debug+Protego=false (1 config)
   - VM 3: Release+Protego=true (1 config)
4. **teardown-gpu** job: Deallocates all 3 VMs to stop billing (~1 min)

### VM Naming Convention

- Base VM: `CICD-NCasT4v3` (configured in GitHub secret `AZURE_CICD_GPU_VM_BASE`)
- Additional VMs: `CICD-NCasT4v3-2`, `CICD-NCasT4v3-3`
- Workflow automatically appends `-2`, `-3` etc. based on the base name

### Key Design Decisions

#### Persistent OS Disks (32GB Standard SSD)

- **Why**: Drivers/Docker persist across deallocations, no reinstallation needed
- **Cost**: \$2.40/month per VM (\$7.20/month for 3 VMs) - worth it for simplicity
- **vs. Ephemeral**: Ephemeral disks are wiped on deallocation, requiring ~10 min reinstall each time

#### No Data Disks

- Docker images and build artifacts use VM's temp storage (free, ~150GB on Standard_NC4as_T4_v3)
- Azure ingress bandwidth is FREE, so pulling images from GHCR takes only ~3-4 min
- Saves \$2.40/month per VM (\$7.20/month for 3 VMs)

#### Dynamic Public IPs

- Queried at runtime by workflow using `az vm show -d --query publicIps`
- Saves \$4/month per VM (\$12/month for 3 VMs) vs. static IPs
- Adds only ~5 seconds per workflow run

#### Ubuntu 24.04 LTS with Secure Boot Disabled

- Long-term support until 2029
- Secure Boot disabled to avoid NVIDIA driver MOK enrollment issues
- Simpler setup, no serial console access needed

---

## Prerequisites

### 1. Azure CLI Setup

```bash
# Install Azure CLI (if not already installed)
# macOS:
brew install azure-cli

# Linux:
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Verify installation
az --version

# Login to Azure
az login

# Set your subscription
az account set --subscription "Your Subscription Name"
```

### 2. Check Azure Quotas

**Required**: 12 vCPUs for Standard NCASv3_T4 Family (3 VMs × 4 vCPUs)

```bash
# Check current quota
az vm list-usage --location westus2 \
  --query "[?contains(name.value, 'NCASv3_T4')].{Name:name.localizedValue, Current:currentValue, Limit:limit}" \
  --output table
```

If your quota is less than 12 vCPUs:

1. Go to [Azure Portal](https://portal.azure.com) → Subscriptions → Usage + quotas
2. Search for "Standard NCASv3_T4 Family vCPUs"
3. Request increase to **24** (allows headroom for 4-6 VMs)
4. Justification: "Parallel GPU CI/CD testing for computational mechanics project"
5. Approval time: Usually instant to 2 business days

### 3. Verify Resource Group and SSH Key

```bash
# Check resource group exists
az group show --name APERIAZUREGPU_GROUP

# If not, create it
az group create --name APERIAZUREGPU_GROUP --location westus2

# Verify SSH public key exists
ls -la ~/.ssh/AperiAzureGPU2_key.pem.pub

# If only private key exists, generate public key from it
ssh-keygen -y -f ~/.ssh/AperiAzureGPU2_key.pem > ~/.ssh/AperiAzureGPU2_key.pem.pub
```

---

## Section A: Creating VMs with Azure CLI

### Create Base VM (CICD-NCasT4v3)

**Important**: We use persistent OS disks (not ephemeral) so drivers survive VM deallocation.

```bash
az vm create \
  --resource-group APERIAZUREGPU_GROUP \
  --name CICD-NCasT4v3 \
  --location westus2 \
  --size Standard_NC4as_T4_v3 \
  --image Ubuntu2404 \
  --admin-username azureuser \
  --ssh-key-values "$(cat ~/.ssh/AperiAzureGPU2_key.pem.pub)" \
  --public-ip-address-allocation dynamic \
  --public-ip-sku Basic \
  --os-disk-size-gb 32 \
  --storage-sku StandardSSD_LRS \
  --priority Regular \
  --security-type TrustedLaunch \
  --enable-secure-boot false \
  --enable-vtpm true \
  --tags purpose=ci-cd pool-member=true
```

**Command breakdown**:

- `--size Standard_NC4as_T4_v3`: 4 vCPUs, 28GB RAM, 1× NVIDIA T4 GPU, ~150GB temp storage
- `--image Ubuntu2404`: Ubuntu 24.04 LTS (supported until 2029)
- `--os-disk-size-gb 32`: Persistent 32GB SSD ($2.40/month)
- `--storage-sku StandardSSD_LRS`: Standard SSD (good balance of cost/performance)
- `--public-ip-address-allocation dynamic`: Free dynamic IP (queried at runtime)
- `--priority Regular`: On-demand pricing (~$0.526/hr, reliable capacity)
- `--security-type TrustedLaunch`: Required for generation 2 VMs
- `--enable-secure-boot false`: **Critical** - Disables Secure Boot to avoid NVIDIA driver MOK enrollment
- `--enable-vtpm true`: Enables virtual TPM (required by TrustedLaunch)

**Expected output**:

```json
{
  "publicIpAddress": "20.x.x.x",
  "powerState": "VM running",
  ...
}
```

**Duration**: ~1 minute

### Create Additional VMs (VM-2 and VM-3)

```bash
# Create VM-2
az vm create \
  --resource-group APERIAZUREGPU_GROUP \
  --name CICD-NCasT4v3-2 \
  --location westus2 \
  --size Standard_NC4as_T4_v3 \
  --image Ubuntu2404 \
  --admin-username azureuser \
  --ssh-key-values "$(cat ~/.ssh/AperiAzureGPU2_key.pem.pub)" \
  --public-ip-address-allocation dynamic \
  --public-ip-sku Basic \
  --os-disk-size-gb 32 \
  --storage-sku StandardSSD_LRS \
  --priority Regular \
  --security-type TrustedLaunch \
  --enable-secure-boot false \
  --enable-vtpm true \
  --tags purpose=ci-cd pool-member=true

# Create VM-3
az vm create \
  --resource-group APERIAZUREGPU_GROUP \
  --name CICD-NCasT4v3-3 \
  --location westus2 \
  --size Standard_NC4as_T4_v3 \
  --image Ubuntu2404 \
  --admin-username azureuser \
  --ssh-key-values "$(cat ~/.ssh/AperiAzureGPU2_key.pem.pub)" \
  --public-ip-address-allocation dynamic \
  --public-ip-sku Basic \
  --os-disk-size-gb 32 \
  --storage-sku StandardSSD_LRS \
  --priority Regular \
  --security-type TrustedLaunch \
  --enable-secure-boot false \
  --enable-vtpm true \
  --tags purpose=ci-cd pool-member=true
```

**Total time**: ~3 minutes (1 min per VM)

### Verify All VMs Created

```bash
# List all VMs in the pool
az vm list -d --resource-group APERIAZUREGPU_GROUP --output table

# Expected output:
# Name              ResourceGroup        PowerState    Location
# ----------------  -------------------  ------------  ----------
# CICD-NCasT4v3     APERIAZUREGPU_GROUP  VM running    westus2
# CICD-NCasT4v3-2   APERIAZUREGPU_GROUP  VM running    westus2
# CICD-NCasT4v3-3   APERIAZUREGPU_GROUP  VM running    westus2
```

---

## Section B: Running Setup Script on Each VM

The `setup-new-vm.sh` script installs Docker, NVIDIA drivers, Git, and configures temp storage.

### For Base VM (CICD-NCasT4v3)

```bash
# Get VM's current IP
VM_IP=$(az vm show -d --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3 --query publicIps -o tsv)
echo "VM IP: $VM_IP"

# Copy setup script to VM
scp -i ~/.ssh/AperiAzureGPU2_key.pem scripts/setup-new-vm.sh azureuser@$VM_IP:~/

# SSH to VM
ssh -i ~/.ssh/AperiAzureGPU2_key.pem azureuser@$VM_IP

# On the VM, run setup script
chmod +x setup-new-vm.sh
./setup-new-vm.sh

# Script will take ~10-15 minutes and display progress
# When complete, it will prompt you to reboot
```

**What the script does**:

1. Updates system packages
2. Installs Docker + Docker Compose
3. Installs NVIDIA driver 570-server for Tesla T4
4. Installs NVIDIA Container Toolkit (GPU support in Docker)
5. Installs Git + Git LFS
6. Configures Docker to use `/mnt` (temp storage) for images/builds
7. Creates `~/aperi-mech` workspace

### Reboot and Verify

**After script completes**, reboot to activate NVIDIA drivers:

```bash
# Still on the VM
sudo reboot
```

**Wait ~30-60 seconds for VM to fully boot**, then SSH back in and verify GPU works.

### Verify GPU and Docker

**After reboot**, SSH back in and verify everything works:

```bash
# Get VM IP (may have changed on reboot if dynamic)
VM_IP=$(az vm show -d --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3 --query publicIps -o tsv)
echo "VM IP: $VM_IP"

# SSH to VM
ssh -i ~/.ssh/AperiAzureGPU2_key.pem azureuser@$VM_IP

# Verify GPU is detected
nvidia-smi
```

**Expected output**:

```text
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 570.xx.xx    Driver Version: 570.xx.xx    CUDA Version: 12.x   |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
|   0  Tesla T4            Off  | 00000001:00:00.0 Off |                    0 |
+-------------------------------+----------------------+----------------------+
```

**If `nvidia-smi` works**: Success! ✅ Continue to Docker GPU test.

**If `nvidia-smi` fails**: See troubleshooting section (likely Secure Boot not disabled properly).

### Test Docker GPU Access

```bash
# Test GPU works inside Docker containers
docker run --rm --gpus all nvidia/cuda:11.8.0-base-ubuntu22.04 nvidia-smi

# Expected: Same GPU info from within container
```

### Pull Your Docker Image

```bash
# Pull your project's Docker image (measure time)
time docker pull ghcr.io/aperijake/aperi-mech:cuda-t4

# Expected: ~3-4 minutes for 15-16GB image
# Note: Azure ingress bandwidth is FREE
```

**Note**: You don't need to clone the repository on the VM. The Docker image contains the code, and the CI/CD workflow will check out the specific commit being tested into `~/aperi-mech` automatically.

### Repeat for VM-2 and VM-3

**Now that you know the process works**, repeat for the other VMs:

```bash
# For VM-2
VM_IP=$(az vm show -d --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3-2 --query publicIps -o tsv)
scp -i ~/.ssh/AperiAzureGPU2_key.pem scripts/setup-new-vm.sh azureuser@$VM_IP:~/
ssh -i ~/.ssh/AperiAzureGPU2_key.pem azureuser@$VM_IP
chmod +x setup-new-vm.sh
./setup-new-vm.sh
# Reboot: sudo reboot
# Wait 30-60 seconds, SSH back in, verify: nvidia-smi
# Pull image: docker pull ghcr.io/aperijake/aperi-mech:cuda-t4

# For VM-3 (same process, replace name with CICD-NCasT4v3-3)
```

**Expected behavior for VM-2 and VM-3**:

- ✅ Setup script runs without errors (Docker, NVIDIA drivers, Git installed)
- ✅ You may see the same `nvidia-cdi-refresh.service failed` warning (harmless, ignore it)
- ✅ After reboot, `nvidia-smi` works immediately (no MOK enrollment needed)
- ✅ Docker GPU test works
- ✅ Docker image pulls in ~3-4 minutes

**Base VM pool setup is now complete!** All 3 VMs are ready for CI/CD.

---

## Section C: Enabling Boot Diagnostics (Optional but Recommended)

Boot diagnostics stores VM console logs and screenshots, useful for debugging boot issues. Required if you ever need to access Azure Serial Console.

### Enable for All VMs

```bash
# Enable boot diagnostics (managed storage, ~$0.05-0.10/month per VM)
for i in 1 2 3; do
  if [ "$i" = "1" ]; then
    VM_NAME="CICD-NCasT4v3"
  else
    VM_NAME="CICD-NCasT4v3-$i"
  fi

  echo "Enabling boot diagnostics for $VM_NAME..."
  az vm boot-diagnostics enable \
    --resource-group APERIAZUREGPU_GROUP \
    --name "$VM_NAME"
done
```

**Cost impact**: ~$0.30/month for all 3 VMs (negligible)

**Benefits**:

- Access VM console via Azure Portal (Help → Serial console)
- View boot logs when VM won't start
- Capture screenshots of boot errors

**When to enable**: Anytime, but easiest during initial setup. Not required for normal CI/CD operation.

---

## Section D: Testing the VM Pool with CI/CD

Before setting up VM-2 and VM-3, test that the base VM works with your CI/CD workflow.

### Deallocate VMs

```bash
# Stop all VMs to test the workflow's start sequence
az vm deallocate --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3 --no-wait
```

### Trigger Workflow

```bash
# Push a test commit to trigger CI/CD
git commit --allow-empty -m "Test: Verify GPU VM pool setup"
git push
```

### Verify in GitHub Actions

Check that:

- ✅ Setup GPU VM (1) starts the VM successfully
- ✅ Get VM IPs queries the dynamic IP correctly
- ✅ Build and Test GPU jobs connect via SSH
- ✅ GPU tests run and pass
- ✅ Teardown GPU VM (1) deallocates the VM

**If this works**: Proceed to set up VM-2 and VM-3!

**If it fails**: Check troubleshooting section below.

---

## Section E: Temp Storage Configuration

The Standard_NC4as_T4_v3 VMs come with **~150GB of local temp storage** (mounted at `/mnt`). This storage is:

- **Free** (included with VM)
- **Fast** (local SSD)
- **Ephemeral** (wiped on deallocation, but we don't deallocate often)

The `setup-new-vm.sh` script automatically configures Docker to use `/mnt` for:

- Docker images
- Container build artifacts
- CI/CD build outputs

### Verify Temp Storage Setup

```bash
# SSH to any VM
VM_IP=$(az vm show -d --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3 --query publicIps -o tsv)
ssh -i ~/.ssh/AperiAzureGPU2_key.pem azureuser@$VM_IP

# Check temp storage is mounted
df -h /mnt

# Expected output:
# Filesystem      Size  Used Avail Use% Mounted on
# /dev/sdb1       147G   XX   XXG  XX%  /mnt

# Check Docker is using temp storage
docker info | grep "Docker Root Dir"

# Expected: Docker Root Dir: /mnt/docker
```

### Benefits

- **No data disk costs**: Saves \$2.40/month per VM
- **Fast I/O**: Local SSD is faster than network-attached disks
- **Automatic cleanup**: Old images are wiped on deallocation (prevents disk bloat)

### Tradeoffs

When VMs are deallocated (after workflow runs), temp storage is wiped. This means:

- ❌ Docker images must be re-pulled (~3-4 min)
- ✅ No stale data accumulation
- ✅ Fresh environment every run

Since Azure ingress is FREE and workflow runs take 25-35 min anyway, the 3-4 min pull time is acceptable.

---

## Section F: VM Pool Maintenance

### Starting and Stopping VMs

**Manual start** (workflow does this automatically):

```bash
# Start single VM
az vm start --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3

# Start all VMs
for i in 1 2 3; do
  if [ "$i" = "1" ]; then
    VM_NAME="CICD-NCasT4v3"
  else
    VM_NAME="CICD-NCasT4v3-$i"
  fi
  echo "Starting $VM_NAME..."
  az vm start --resource-group APERIAZUREGPU_GROUP --name "$VM_NAME" --no-wait
done
```

**Manual stop/deallocate** (workflow does this automatically):

```bash
# Deallocate single VM (stops billing)
az vm deallocate --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3

# Deallocate all VMs
for i in 1 2 3; do
  if [ "$i" = "1" ]; then
    VM_NAME="CICD-NCasT4v3"
  else
    VM_NAME="CICD-NCasT4v3-$i"
  fi
  echo "Deallocating $VM_NAME..."
  az vm deallocate --resource-group APERIAZUREGPU_GROUP --name "$VM_NAME" --no-wait
done
```

**Note**: Deallocation stops compute billing but OS disk storage ($2.40/month per VM) continues.

### Monitoring Costs

```bash
# Check current month costs for resource group
az consumption usage list \
  --start-date $(date -u -d "$(date +%Y-%m-01)" +%Y-%m-%d) \
  --end-date $(date -u +%Y-%m-%d) \
  --query "[?contains(instanceId, 'APERIAZUREGPU_GROUP')]" \
  --output table
```

**Via Azure Portal**:

1. Go to [Azure Portal](https://portal.azure.com) → Cost Management + Billing
2. Filter by Resource Group: `APERIAZUREGPU_GROUP`
3. View daily/monthly trends

**Expected monthly cost** (3 VMs):

- Compute: ~\$13-17 (3 VMs × ~10-12 hrs/month × \$0.526/hr)
- Storage: \$7.20 (3 VMs × \$2.40/month persistent OS disks)
- **Total: ~$20-24/month**

### Updating NVIDIA Drivers

If you need to update NVIDIA drivers (e.g., new driver version for T4):

1. **Update `setup-new-vm.sh`** with new driver version
2. **SSH to each VM** and re-run the script (it's idempotent):

```bash
# For each VM
VM_IP=$(az vm show -d --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3 --query publicIps -o tsv)
scp -i ~/.ssh/AperiAzureGPU2_key.pem scripts/setup-new-vm.sh azureuser@$VM_IP:~/
ssh -i ~/.ssh/AperiAzureGPU2_key.pem azureuser@$VM_IP "./setup-new-vm.sh && sudo reboot"
```

**Alternative**: Delete and recreate VMs (only takes ~20 min per VM with this guide).

### Updating Docker or Other Dependencies

Same process as NVIDIA drivers: update `setup-new-vm.sh`, re-run on all VMs, reboot if needed.

---

## Section G: Scaling to 4+ VMs

To add a 4th VM (or more) to the pool, you need to:

1. Create the new VM(s)
2. Run setup script
3. Update GitHub Actions workflow

### 1. Create New VM

```bash
# Create VM-4
az vm create \
  --resource-group APERIAZUREGPU_GROUP \
  --name CICD-NCasT4v3-4 \
  --location westus2 \
  --size Standard_NC4as_T4_v3 \
  --image Ubuntu2404 \
  --admin-username azureuser \
  --ssh-key-values "$(cat ~/.ssh/AperiAzureGPU2_key.pem.pub)" \
  --public-ip-address-allocation dynamic \
  --public-ip-sku Basic \
  --os-disk-size-gb 32 \
  --storage-sku StandardSSD_LRS \
  --priority Regular \
  --security-type TrustedLaunch \
  --enable-secure-boot false \
  --enable-vtpm true \
  --tags purpose=ci-cd pool-member=true
```

### 2. Run Setup Script

Follow **Section B** for the new VM (no MOK enrollment needed with Secure Boot disabled).

### 3. Update GitHub Actions Workflow

The workflow uses `VM_POOL_CONFIG` markers to identify all sections that need updates when scaling.

**Search for `VM_POOL_CONFIG` in `.github/workflows/ci-cd-pipeline.yaml` and update**:

1. **Line ~286**: `setup-gpu.strategy.max-parallel: 4` (update from 3 to 4)
2. **Line ~288**: `setup-gpu.matrix.vm_index: [1, 2, 3, 4]` (add 4)
3. **Line ~392-396**: Add case for `4` in checkout code mapping
4. **Line ~449-453**: Add `vm_ip_4` output declaration
5. **Line ~467**: Update loop to `for i in 1 2 3 4`
6. **Line ~492**: `build-and-test-gpu.strategy.max-parallel: 4` (update from 3 to 4)
7. **Line ~497-501**: Update test config to VM_INDEX mapping (assign configs to VM 4)
8. **Line ~513-517**: Add case for `4` in Set VM IP mapping
9. **Line ~681**: `teardown-gpu.strategy.max-parallel: 4` (update from 3 to 4)
10. **Line ~683**: `teardown-gpu.matrix.vm_index: [1, 2, 3, 4]` (add 4)

**With 4 VMs**, you can achieve true 1:1 parallelization (4 test configs across 4 VMs), reducing runtime to ~20-25 min.

**Cost impact**: +\$4/month (1 VM × ~\$4/month) = **~$24-28/month total**

---

## Section H: Troubleshooting

### VM Won't Start

**Symptom**: `az vm start` fails or times out

**Check VM status**:

```bash
az vm get-instance-view \
  --resource-group APERIAZUREGPU_GROUP \
  --name CICD-NCasT4v3 \
  --query instanceView.statuses[1].displayStatus \
  --output tsv

# Possible outputs:
# - "VM deallocated" → Start it with: az vm start ...
# - "VM running" → Already running
# - Error → VM may be deleted or corrupted
```

**Common causes**:

- **Insufficient quota**: Check quota (Section: Prerequisites → Check Azure Quotas)
- **VM deleted**: Recreate using Section A
- **Azure region capacity**: Rare for on-demand VMs, try different region or wait

### SSH Connection Fails

**Symptom**: `ssh` times out or "Connection refused"

**Debug steps**:

```bash
# 1. Verify VM is running
az vm get-instance-view --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3 \
  --query instanceView.statuses[1].displayStatus -o tsv

# 2. Get current IP (dynamic IPs change on each start)
VM_IP=$(az vm show -d --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3 --query publicIps -o tsv)
echo "Current IP: $VM_IP"

# 3. Test SSH with verbose output
ssh -v -i ~/.ssh/AperiAzureGPU2_key.pem azureuser@$VM_IP
```

**Common causes**:

- **Wrong IP**: Dynamic IPs change, always query current IP
- **VM not running**: Start it first
- **SSH key mismatch**: Verify you're using the correct private key
- **Network security group**: Check Azure Portal → VM → Networking → Allow SSH (port 22)

### NVIDIA Driver Not Loading

**Symptom**: `nvidia-smi` returns "command not found" or "NVIDIA-SMI has failed"

**Check driver installation**:

```bash
# Check if NVIDIA driver packages are installed
dpkg -l | grep nvidia-driver

# Expected: nvidia-driver-570-server or similar
```

**If not installed**: Re-run `setup-new-vm.sh` script (Section B).

**If installed but not working**:

```bash
# Check kernel modules
lsmod | grep nvidia

# If empty, driver not loaded → likely Secure Boot is still enabled
```

**Solution**: Verify Secure Boot is disabled:

```bash
# Check Secure Boot status
az vm show \
  --resource-group APERIAZUREGPU_GROUP \
  --name CICD-NCasT4v3 \
  --query securityProfile.uefiSettings.secureBootEnabled

# Expected: false
# If true, disable it:
az vm deallocate --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3
az vm update \
  --resource-group APERIAZUREGPU_GROUP \
  --name CICD-NCasT4v3 \
  --set securityProfile.uefiSettings.secureBootEnabled=false
az vm start --resource-group APERIAZUREGPU_GROUP --name CICD-NCasT4v3
```

### Docker GPU Access Failed

**Symptom**: `docker run --gpus all` fails with "could not select device driver"

**Check NVIDIA Container Toolkit**:

```bash
# Verify toolkit is installed
dpkg -l | grep nvidia-container-toolkit

# Check Docker runtime configuration
docker info | grep -i runtime
```

**Fix**:

```bash
# Reinstall NVIDIA Container Toolkit
sudo apt-get install -y --reinstall nvidia-container-toolkit

# Reconfigure Docker runtime
sudo nvidia-ctk runtime configure --runtime=docker

# Restart Docker
sudo systemctl restart docker

# Test again
docker run --rm --gpus all nvidia/cuda:11.8.0-base-ubuntu22.04 nvidia-smi
```

### Setup Script Shows CDI Refresh Warning

**Symptom**: During setup script, you see:

```text
Job for nvidia-cdi-refresh.service failed because the control process exited with error code.
Warning: Failed to trigger CDI refresh
```

**This is normal and harmless!** The NVIDIA Container Toolkit tries to refresh its configuration, but the NVIDIA drivers aren't loaded yet (requires reboot). This warning can be safely ignored.

**After reboot**: The CDI refresh will succeed automatically when you run the Docker GPU test.

### Workflow Can't Query VM IP

**Symptom**: `get-vm-ips` job fails or returns null

**Manual test**:

```bash
az vm show -d \
  --resource-group APERIAZUREGPU_GROUP \
  --name CICD-NCasT4v3 \
  --query publicIps \
  --output tsv
```

**If empty/null**:

- VM not running → Start it
- Public IP not assigned → Verify VM was created with `--public-ip-address-allocation dynamic`
- VM deleted → Recreate using Section A

**Verify public IP exists**:

```bash
az network public-ip list \
  --resource-group APERIAZUREGPU_GROUP \
  --output table
```

### Temp Storage Not Mounted

**Symptom**: `/mnt` is empty or Docker not using it

**Check mount**:

```bash
df -h /mnt
mount | grep /mnt

# Expected: /dev/sdb1 on /mnt type ext4
```

**If not mounted**:

```bash
# Check if disk exists
lsblk

# Expected to see sdb1 (~150GB)

# Manual mount (temporary)
sudo mount /dev/sdb1 /mnt

# Permanent fix: Add to /etc/fstab (should be automatic on Azure VMs)
```

**Docker not using `/mnt`**:

```bash
# Check Docker config
cat /etc/docker/daemon.json

# Expected: "data-root": "/mnt/docker"

# If not set, edit config
sudo nano /etc/docker/daemon.json
# Add: {"data-root": "/mnt/docker"}

# Restart Docker
sudo systemctl restart docker
```

---

## Support & References

### Azure Documentation

- [NCASv3_T4 Series VMs](https://learn.microsoft.com/azure/virtual-machines/ncast4-v3-series)
- [Azure VM Pricing Calculator](https://azure.microsoft.com/pricing/calculator/)
- [Managing VM Quotas](https://learn.microsoft.com/azure/quotas/per-vm-quota-requests)

### NVIDIA Documentation

- [NVIDIA Driver Installation (Ubuntu)](https://docs.nvidia.com/datacenter/tesla/tesla-installation-notes/)
- [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html)

### Project Files

- [setup-new-vm.sh](setup-new-vm.sh) - VM setup script
- [.github/workflows/ci-cd-pipeline.yaml](../.github/workflows/ci-cd-pipeline.yaml) - Full CI/CD workflow

### Getting Help

**For VM/Azure issues**:

1. Check Azure Portal → Virtual Machines → Diagnostics
2. Review Azure Serial Console logs
3. Verify quotas and billing status

**For workflow issues**:

1. Check GitHub Actions logs
2. Search for "VM_POOL_CONFIG" in workflow to verify all sections updated
3. Test VM connectivity manually (SSH, nvidia-smi, docker)

**For driver/GPU issues**:

1. Always start with `nvidia-smi` to verify GPU detection
2. Review kernel logs: `dmesg | grep -i nvidia`
