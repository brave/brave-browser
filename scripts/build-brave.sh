#!/bin/bash -e
##############################
# Author: Adam M Dutko       # 
# E-Mail: adam@runbymany.com #
# Version: 0.0.3             #
# Released: January 5, 2022  #
# Updated: January 10, 2022   #
##############################


# Don't run as root.
if [ `id -u` = 0 ]; then
    echo "ERROR: Don't run as root."
    exit 1
fi


# Confirm it's Ubuntu
if [[ ! `lsb_release -i` =~ .*Ubuntu*. ]]; then
    echo "ERROR: Intended for use on Ubuntu."
    exit 1
fi


# Confirm it's 18.04 LTS
if [[ ! `lsb_release -a` =~ .*18.04*. ]]; then
    echo "ERROR: Intended for use on Ubuntu 18.04."
    exit 1
fi

# Create our build path
BUILDPATH=$1
if [ -z $BUILDPATH ]; then
    echo "ERROR: PATH required as first parameter."
    exit 1
fi

if [ ! -e $BUILDPATH ]; then
    echo "Attempting to make $BUILDPATH ..."
    mkdir $BUILDPATH
    echo "$BUILDPATH created."
fi


# Setup our prerequisites
echo "Attempting to install pre-requisites ..."
sudo apt-get update
sudo apt-get -y install git python3 build-essential libgnome-keyring-dev python-setuptools npm ninja-build
sudo npm install -g n
sudo n stable
export PATH="/usr/local/bin:$PATH"
PATH="/usr/local/bin:$PATH"


# Attempt code fetches and builds per brave-browser build instructions.
#
# https://github.com/brave/brave-browser/blob/master/README.md
#
cd $BUILDPATH
if [ -e brave-browser ]; then
    cd brave-browser
    git pull
else
    git clone https://github.com/brave/brave-browser.git 
    cd brave-browser
fi

export INIT_CWD=$BUILDPATH/brave-browser/
npm install
npm config set target_os=linux
npm config set target_arch=x64
npm config set is_official_build=false 
npm config set brave_services_key=somefakekey
npm config set updater_dev_endpoint=https://
npm config set updater_prod_endpoint=https://
npm config set brave_stats_updater_url=https://
npm config set brave_sync_endpoint=https://
npm config set brave_variations_server_url=https://
npm config set uphold_client_id=fake
npm config set uphold_client_secret=fake
npm config set gemini_api_url=https://
npm config set gemini_oauth_url=https://
npm config set gemini_wallet_client_id=fake
npm config set gemini_wallet_client_secret=fake
npm config set rewards_grant_dev_endpoint=https://
npm config set rewards_grant_staging_endpoint=https://
npm config set rewards_grant_prod_endpoint=https://
npm run init
echo "Y" | ./src/build/install-build-deps.sh
npm run build Release
# See build targets
#ninja -C out/Release -t targets all | grep installer
cd src
# Add our version stamp
echo "0.0.0" > out/Release/version
# Generate a debian based package
ninja -C out/Release "chrome/installer/linux:unstable_deb"
