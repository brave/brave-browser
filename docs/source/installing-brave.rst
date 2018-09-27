Installing Brave
################

Linux
*****

Beta Channel Installation
================================

.. highlight:: console

Ubuntu 16.04 Installation
-------------------------
::

    curl https://brave-browser-apt-beta.s3.brave.com/brave-core-nightly.asc | sudo apt-key add -

    echo "deb [arch=amd64] https://brave-browser-apt-beta.s3.brave.com/ `lsb_release -sc` main" | sudo tee -a /etc/apt/sources.list.d/brave-`lsb_release -sc`.list

    sudo apt update

    sudo apt install brave-browser-beta


Fedora 28
---------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-beta.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-beta.s3.brave.com/brave-core-nightly.asc

    sudo dnf install brave-browser-beta


Development Channel Installation
================================

.. highlight:: console

Ubuntu 16.04 Installation
-------------------------
::

    curl https://brave-browser-apt-dev.s3.brave.com/brave-core-nightly.asc | sudo apt-key add -

    echo "deb [arch=amd64] https://brave-browser-apt-dev.s3.brave.com/ `lsb_release -sc` main" | sudo tee -a /etc/apt/sources.list.d/brave-`lsb_release -sc`.list

    cat /etc/apt/sources.list.d/brave-xenial.list

    sudo apt update

    sudo apt install brave-browser-dev

To verify checksum::

    wget https://brave-browser-apt-dev.s3.brave.com/pool/main/b/brave-browser-dev/brave-browser-dev_0.50.14_amd64.deb


    wget https://s3-us-west-2.amazonaws.com/brave-brave-binaries/releases/tmp/v0.50.14/brave-browser-dev_0.50.14_amd64.deb.sha256sum


    more brave-browser-dev_0.50.14_amd64.deb.sha256sum
    319b925220d07cc4810fd9848a1d09a53d0d66e31e3ea0a8f892336fa26ac1c0 *brave-browser-dev_0.50.14_amd64.deb


    sha256sum brave-browser-dev_0.50.14_amd64.deb
    319b925220d07cc4810fd9848a1d09a53d0d66e31e3ea0a8f892336fa26ac1c0  brave-browser-dev_0.50.14_amd64.deb


Fedora 28
---------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-dev.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-dev.s3.brave.com/brave-core-nightly.asc

    sudo dnf install brave-browser

To verify checksum::

    wget https://brave-browser-rpm-dev.s3.brave.com/x86_64/brave-browser-dev-0.50.14-1.x86_64.rpm


    wget https://s3-us-west-2.amazonaws.com/brave-brave-binaries/releases/tmp/v0.50.14/brave-browser-dev-0.50.14-1.x86_64.rpm.sha256sum


    more brave-browser-dev-0.50.14-1.x86_64.rpm.sha256sum
    d6e88ddb0990a86a3697069b51a636530869f474135d3c6ee10409562c84571f *brave-browser-dev-0.50.14-1.x86_64.rpm


    sha256sum brave-browser-dev-0.50.14-1.x86_64.rpm
    d6e88ddb0990a86a3697069b51a636530869f474135d3c6ee10409562c84571f  brave-browser-dev-0.50.14-1.x86_64.rpm
