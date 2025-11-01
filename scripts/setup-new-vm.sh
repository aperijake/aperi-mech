#!/bin/bash

################################################################################
# Azure GPU VM Setup Script for CI/CD Pool
#
# This script prepares a fresh Ubuntu 24.04 Azure VM for GPU CI/CD workloads:
# - Docker + Docker Compose (for running containers)
# - NVIDIA drivers 570-server for Tesla T4 GPU (pre-built kernel modules)
# - NVIDIA Container Toolkit (GPU support in Docker containers)
# - Git + Git LFS (for repository checkout)
# - Docker configured to use /mnt temp storage (free, fast local SSD)
#
# Prerequisites:
# - Ubuntu 24.04 LTS
# - Standard_NC4as_T4_v3 VM (or similar GPU VM)
# - Internet connectivity
#
# Usage:
#   chmod +x setup-new-vm.sh
#   ./setup-new-vm.sh
#
# After completion:
#   1. Reboot the VM: sudo reboot
#   2. Complete MOK enrollment via Azure Serial Console (see VM_POOL_GUIDE.md)
#   3. Verify: nvidia-smi && docker run --rm --gpus all nvidia/cuda:11.8.0-base-ubuntu22.04 nvidia-smi
################################################################################

set -e          # Exit immediately if any command fails
set -u          # Exit if undefined variable is used
set -o pipefail # Exit if any command in a pipe fails

################################################################################
# Configuration
################################################################################

NVIDIA_DRIVER_VERSION="570-server"
DOCKER_DATA_ROOT="/mnt/docker"
KERNEL_VERSION=$(uname -r)

################################################################################
# Utility Functions
################################################################################

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
	echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
	echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
	echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
	echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
	echo ""
	echo -e "${CYAN}========================================${NC}"
	echo -e "${CYAN}$1${NC}"
	echo -e "${CYAN}========================================${NC}"
}

# Check if command exists
command_exists() {
	command -v "$1" &>/dev/null
}

# Check if package is installed
package_installed() {
	dpkg -l "$1" 2>/dev/null | grep -q "^ii"
}

################################################################################
# Main Setup Functions
################################################################################

check_prerequisites() {
	log_step "Checking Prerequisites"

	# Check Ubuntu version
	if [ -f /etc/os-release ]; then
		. /etc/os-release
		log_info "Detected OS: $NAME $VERSION"

		if [[ $VERSION_ID != "24.04" ]]; then
			log_warning "This script is designed for Ubuntu 24.04, detected $VERSION_ID"
			log_warning "Continuing anyway, but you may encounter issues..."
		fi
	fi

	# Check if running as non-root
	if [ "$EUID" -eq 0 ]; then
		log_error "Please run this script as a regular user (not root)"
		log_error "The script will use sudo when needed"
		exit 1
	fi

	# Check sudo access
	if ! sudo -n true 2>/dev/null; then
		log_info "Testing sudo access (you may be prompted for password)..."
		sudo true
	fi

	log_success "Prerequisites check passed"
}

update_system() {
	log_step "Step 1/7: Updating System Packages"

	log_info "Updating package lists..."
	sudo apt-get update -qq

	log_info "Upgrading installed packages (this may take a few minutes)..."
	sudo DEBIAN_FRONTEND=noninteractive apt-get upgrade -y -qq

	log_success "System packages updated"
}

install_docker() {
	log_step "Step 2/7: Installing Docker"

	# Check if Docker is already installed
	if command_exists docker; then
		DOCKER_VERSION=$(docker --version | awk '{print $3}' | tr -d ',')
		log_info "Docker is already installed (version: $DOCKER_VERSION)"

		# Check if user is in docker group
		if groups | grep -q docker; then
			log_info "User already in docker group"
		else
			log_info "Adding user to docker group..."
			sudo usermod -aG docker "$USER"
			log_success "User added to docker group (logout/login required for effect)"
		fi

		return 0
	fi

	log_info "Docker not found, installing..."

	# Remove old versions
	log_info "Removing old Docker versions (if any)..."
	sudo apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true

	# Install prerequisites
	log_info "Installing prerequisites..."
	sudo apt-get install -y -qq \
		ca-certificates \
		curl \
		gnupg \
		lsb-release

	# Add Docker's official GPG key
	log_info "Adding Docker GPG key..."
	sudo mkdir -p /etc/apt/keyrings
	curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

	# Set up Docker repository
	log_info "Adding Docker repository..."
	echo \
		"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

	# Install Docker Engine
	log_info "Installing Docker Engine..."
	sudo apt-get update -qq
	sudo apt-get install -y -qq \
		docker-ce \
		docker-ce-cli \
		containerd.io \
		docker-buildx-plugin \
		docker-compose-plugin

	# Add user to docker group
	log_info "Adding user to docker group..."
	sudo usermod -aG docker "$USER"

	# Verify installation
	DOCKER_VERSION=$(docker --version | awk '{print $3}' | tr -d ',')
	log_success "Docker installed successfully (version: $DOCKER_VERSION)"
	log_info "Note: Logout/login required for docker group membership to take effect"
}

configure_docker_storage() {
	log_step "Step 3/7: Configuring Docker to Use Temp Storage"

	# Check if /mnt is mounted and has space
	if ! mountpoint -q /mnt; then
		log_warning "/mnt is not mounted, skipping Docker storage configuration"
		log_warning "Docker will use default storage location"
		return 0
	fi

	AVAILABLE_SPACE=$(df -BG /mnt | tail -1 | awk '{print $4}' | tr -d 'G')
	log_info "Available space on /mnt: ${AVAILABLE_SPACE}GB"

	if [ "$AVAILABLE_SPACE" -lt 50 ]; then
		log_warning "Less than 50GB available on /mnt, Docker may run out of space"
	fi

	# Create Docker data directory on /mnt
	if [ ! -d "$DOCKER_DATA_ROOT" ]; then
		log_info "Creating Docker data directory: $DOCKER_DATA_ROOT"
		sudo mkdir -p "$DOCKER_DATA_ROOT"
		sudo chown -R "$USER:$USER" "$DOCKER_DATA_ROOT"
	else
		log_info "Docker data directory already exists: $DOCKER_DATA_ROOT"
	fi

	# Configure Docker daemon
	log_info "Configuring Docker daemon to use $DOCKER_DATA_ROOT"

	DAEMON_JSON="/etc/docker/daemon.json"
	if [ -f "$DAEMON_JSON" ]; then
		log_info "Backing up existing daemon.json..."
		sudo cp "$DAEMON_JSON" "${DAEMON_JSON}.backup"
	fi

	# Create daemon.json with data-root configuration
	sudo tee "$DAEMON_JSON" >/dev/null <<EOF
{
  "data-root": "$DOCKER_DATA_ROOT",
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
EOF

	# Restart Docker to apply configuration
	log_info "Restarting Docker daemon..."
	sudo systemctl restart docker

	# Verify configuration
	ACTUAL_DATA_ROOT=$(sudo docker info 2>/dev/null | grep "Docker Root Dir" | awk '{print $4}')
	if [ "$ACTUAL_DATA_ROOT" = "$DOCKER_DATA_ROOT" ]; then
		log_success "Docker configured to use temp storage: $DOCKER_DATA_ROOT"
	else
		log_warning "Docker data root verification failed"
		log_warning "Expected: $DOCKER_DATA_ROOT, Got: $ACTUAL_DATA_ROOT"
	fi
}

install_nvidia_drivers() {
	log_step "Step 4/7: Installing NVIDIA Drivers for Tesla T4"

	# Check if NVIDIA driver is already installed
	if command_exists nvidia-smi; then
		log_info "NVIDIA drivers appear to be installed"

		# Try to get driver version (may fail if not loaded yet)
		if nvidia-smi &>/dev/null; then
			DRIVER_VER=$(nvidia-smi --query-gpu=driver_version --format=csv,noheader 2>/dev/null || echo "unknown")
			log_info "Current NVIDIA driver version: $DRIVER_VER"
			log_info "Skipping driver installation (already installed)"
			return 0
		else
			log_warning "nvidia-smi installed but driver not loaded (reboot may be needed)"
			log_info "Continuing with driver installation to ensure correct version..."
		fi
	fi

	log_info "Installing NVIDIA driver $NVIDIA_DRIVER_VERSION for Tesla T4..."
	log_warning "Using pre-built kernel modules (faster, more reliable than DKMS)"

	# Disable Azure automatic NVIDIA driver installation (can conflict)
	log_info "Checking for Azure automatic NVIDIA services..."
	if systemctl list-unit-files 2>/dev/null | grep -q nvidia-persistenced; then
		log_info "Disabling Azure NVIDIA service to prevent conflicts..."
		sudo systemctl stop nvidia-persistenced 2>/dev/null || true
		sudo systemctl disable nvidia-persistenced 2>/dev/null || true
	fi

	# Install linux-headers for current kernel
	log_info "Installing kernel headers for $KERNEL_VERSION..."
	if ! package_installed "linux-headers-$KERNEL_VERSION"; then
		sudo apt-get install -y -qq "linux-headers-$KERNEL_VERSION"
	else
		log_info "Kernel headers already installed"
	fi

	# Install pre-built NVIDIA kernel modules for current kernel
	# This is critical for Azure VMs which use -azure kernel variant
	log_info "Installing pre-built NVIDIA modules for kernel $KERNEL_VERSION..."
	NVIDIA_MODULE_PACKAGE="linux-modules-nvidia-${NVIDIA_DRIVER_VERSION}-${KERNEL_VERSION}"

	if ! package_installed "$NVIDIA_MODULE_PACKAGE"; then
		sudo apt-get install -y -qq "$NVIDIA_MODULE_PACKAGE" || {
			log_error "Failed to install $NVIDIA_MODULE_PACKAGE"
			log_error "This may be due to kernel version mismatch"
			log_info "Available nvidia module packages:"
			apt-cache search "linux-modules-nvidia-.*-$(uname -r | sed 's/-azure$//')" || true
			exit 1
		}
	else
		log_info "NVIDIA kernel modules already installed"
	fi

	# Install NVIDIA driver stack
	log_info "Installing NVIDIA driver stack..."
	NVIDIA_DRIVER_PACKAGE="nvidia-driver-${NVIDIA_DRIVER_VERSION}"

	if ! package_installed "$NVIDIA_DRIVER_PACKAGE"; then
		sudo apt-get install -y -qq "$NVIDIA_DRIVER_PACKAGE"
	else
		log_info "NVIDIA driver package already installed"
	fi

	log_success "NVIDIA drivers installed successfully"
	log_warning "VM reboot required to activate drivers"
	log_warning "After reboot, you must complete MOK enrollment via Azure Serial Console"
}

install_nvidia_container_toolkit() {
	log_step "Step 5/7: Installing NVIDIA Container Toolkit"

	# Check if already installed
	if package_installed nvidia-container-toolkit; then
		log_info "NVIDIA Container Toolkit already installed"

		# Verify Docker runtime is configured
		if sudo docker info 2>/dev/null | grep -q nvidia; then
			log_info "Docker NVIDIA runtime already configured"
			return 0
		else
			log_info "Reconfiguring Docker NVIDIA runtime..."
		fi
	else
		log_info "Installing NVIDIA Container Toolkit..."

		# Add NVIDIA GPG key
		log_info "Adding NVIDIA GPG key..."
		curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey |
			sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg

		# Add NVIDIA repository
		log_info "Adding NVIDIA Container Toolkit repository..."
		curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list |
			sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' |
			sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

		# Install toolkit
		log_info "Installing toolkit packages..."
		sudo apt-get update -qq
		sudo apt-get install -y -qq nvidia-container-toolkit
	fi

	# Configure Docker to use NVIDIA runtime
	log_info "Configuring Docker runtime for NVIDIA GPU support..."
	sudo nvidia-ctk runtime configure --runtime=docker

	# Restart Docker
	log_info "Restarting Docker daemon..."
	sudo systemctl restart docker

	log_success "NVIDIA Container Toolkit installed and configured"
}

install_git() {
	log_step "Step 6/7: Installing Git and Git LFS"

	# Check if Git is already installed
	if command_exists git; then
		GIT_VERSION=$(git --version | awk '{print $3}')
		log_info "Git already installed (version: $GIT_VERSION)"
	else
		log_info "Installing Git..."
		sudo apt-get install -y -qq git
		GIT_VERSION=$(git --version | awk '{print $3}')
		log_success "Git installed (version: $GIT_VERSION)"
	fi

	# Check if Git LFS is already installed
	if command_exists git-lfs; then
		GIT_LFS_VERSION=$(git lfs version | awk '{print $1}' | cut -d'/' -f2)
		log_info "Git LFS already installed (version: $GIT_LFS_VERSION)"
	else
		log_info "Installing Git LFS..."
		sudo apt-get install -y -qq git-lfs
		log_success "Git LFS installed"
	fi

	# Initialize Git LFS for current user
	if git lfs install &>/dev/null; then
		log_info "Git LFS initialized for current user"
	else
		log_warning "Git LFS initialization failed (may already be initialized)"
	fi

	log_success "Git and Git LFS ready"
}

create_workspace() {
	log_step "Step 7/7: Creating Workspace Directory"

	WORKSPACE_DIR="$HOME/aperi-mech"

	if [ -d "$WORKSPACE_DIR" ]; then
		log_info "Workspace directory already exists: $WORKSPACE_DIR"

		# Check if it's a git repository
		if [ -d "$WORKSPACE_DIR/.git" ]; then
			log_info "Repository already cloned in workspace"
		else
			log_warning "Directory exists but is not a git repository"
			log_info "You may need to clone the repository manually"
		fi
	else
		log_info "Creating workspace directory: $WORKSPACE_DIR"
		mkdir -p "$WORKSPACE_DIR"
		log_success "Workspace directory created"
	fi

	log_info "Workspace ready at: $WORKSPACE_DIR"
}

print_summary() {
	echo ""
	log_step "Setup Complete!"
	echo ""

	log_success "Installed Components:"
	echo "  ✓ Docker $(docker --version 2>/dev/null | awk '{print $3}' | tr -d ',')"
	echo "  ✓ Docker Compose (plugin)"
	echo "  ✓ NVIDIA Driver $NVIDIA_DRIVER_VERSION (kernel modules for $KERNEL_VERSION)"
	echo "  ✓ NVIDIA Container Toolkit"
	echo "  ✓ Git $(git --version 2>/dev/null | awk '{print $3}')"
	echo "  ✓ Git LFS"
	echo ""

	log_success "Configuration:"
	if [ -d "$DOCKER_DATA_ROOT" ]; then
		echo "  ✓ Docker configured to use temp storage: $DOCKER_DATA_ROOT"
	fi
	echo "  ✓ Workspace directory: $HOME/aperi-mech"
	echo ""

	log_warning "IMPORTANT - Next Steps:"
	echo ""
	echo -e "  ${BLUE}1. REBOOT THE VM${NC} to activate NVIDIA drivers:"
	echo -e "     ${GREEN}sudo reboot${NC}"
	echo ""
	echo -e "  ${BLUE}2. After reboot, SSH back in and verify GPU:${NC}"
	echo -e "     ${GREEN}nvidia-smi${NC}"
	echo "     Expected: Tesla T4 GPU with driver $NVIDIA_DRIVER_VERSION"
	echo ""
	echo -e "  ${BLUE}3. Test Docker GPU access:${NC}"
	echo -e "     ${GREEN}docker run --rm --gpus all nvidia/cuda:11.8.0-base-ubuntu22.04 nvidia-smi${NC}"
	echo "     Expected: Same GPU info from within container"
	echo ""
	echo -e "  ${BLUE}4. Pull Docker image:${NC}"
	echo -e "     ${GREEN}time docker pull ghcr.io/aperijake/aperi-mech:cuda-t4${NC}"
	echo "     Expected: ~2-3 minutes for 15-16GB image"
	echo ""
	echo -e "  ${BLUE}Note:${NC} No MOK enrollment needed - Secure Boot is disabled!"
	echo ""

	log_success "After completing these steps, the VM will be ready for CI/CD!"
	echo ""
}

################################################################################
# Main Execution
################################################################################

main() {
	log_step "Azure GPU VM Setup Script"
	echo "Preparing Ubuntu 24.04 VM for GPU CI/CD workloads..."
	echo "This will install Docker, NVIDIA drivers, Git, and configure temp storage."
	echo ""

	check_prerequisites
	update_system
	install_docker
	configure_docker_storage
	install_nvidia_drivers
	install_nvidia_container_toolkit
	install_git
	create_workspace
	print_summary
}

# Run main function
main "$@"
