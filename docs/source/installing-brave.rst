Installing Brave
################

Linux
*****

Beta Channel Installation
================================

.. highlight:: console

Ubuntu 16.04+
-------------
::

    curl https://brave-browser-apt-beta.s3.brave.com/brave-core-nightly.asc | sudo apt-key add -

    echo "deb [arch=amd64] https://brave-browser-apt-beta.s3.brave.com/ `lsb_release -sc` main" | sudo tee -a /etc/apt/sources.list.d/brave-browser-beta-`lsb_release -sc`.list

    sudo apt update

    sudo apt install brave-browser-beta


Mint 17+
--------
::

    curl https://brave-browser-apt-beta.s3.brave.com/brave-core-nightly.asc | sudo apt-key add -

    UBUNTU_CODENAME=$( (grep DISTRIB_CODENAME /etc/upstream-release/lsb-release || grep DISTRIB_CODENAME /etc/lsb-release) 2>/dev/null | cut -d'=' -f2 )

    echo "deb [arch=amd64] https://brave-browser-apt-beta.s3.brave.com/ $UBUNTU_CODENAME main" | sudo tee -a /etc/apt/sources.list.d/brave-browser-beta-$UBUNTU_CODENAME.list

    sudo apt update

    sudo apt install brave-browser-beta


Fedora 28+
----------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-beta.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-beta.s3.brave.com/brave-core-nightly.asc

    sudo dnf install brave-browser-beta


Development Channel Installation
================================

.. highlight:: console

Ubuntu 16.04+
-------------
::

    curl https://brave-browser-apt-dev.s3.brave.com/brave-core-nightly.asc | sudo apt-key add -

    echo "deb [arch=amd64] https://brave-browser-apt-dev.s3.brave.com/ `lsb_release -sc` main" | sudo tee -a /etc/apt/sources.list.d/brave-browser-dev-`lsb_release -sc`.list

    cat /etc/apt/sources.list.d/brave-xenial.list

    sudo apt update

    sudo apt install brave-browser-dev


Mint 17+
--------
::

    curl https://brave-browser-apt-dev.s3.brave.com/brave-core-nightly.asc | sudo apt-key add -

    UBUNTU_CODENAME=$( (grep DISTRIB_CODENAME /etc/upstream-release/lsb-release || grep DISTRIB_CODENAME /etc/lsb-release) 2>/dev/null | cut -d'=' -f2 )

    echo "deb [arch=amd64] https://brave-browser-apt-dev.s3.brave.com/ $UBUNTU_CODENAME main" | sudo tee -a /etc/apt/sources.list.d/brave-browser-dev-$UBUNTU_CODENAME.list

    sudo apt update

    sudo apt install brave-browser-dev


Fedora 28+
----------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-dev.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-dev.s3.brave.com/brave-core-nightly.asc

    sudo dnf install brave-browser-dev
