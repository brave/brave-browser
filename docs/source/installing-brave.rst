Installing Brave
****************

Linux
=====


.. highlight:: console

Ubuntu 16.04 Installation
-------------------------
::

    curl https://s3-us-west-2.amazonaws.com/brave-browser-apt-staging-dev/brave-core-nightly.asc | sudo apt-key add -

    echo "deb [arch=amd64] https://s3-us-west-2.amazonaws.com/brave-browser-apt-staging-dev `lsb_release -sc` main" | sudo tee -a /etc/apt/sources.list.d/brave-`lsb_release -sc`.list

    cat /etc/apt/sources.list.d/brave-xenial.list

    sudo apt update

    sudo apt install brave-browser-dev

To verify checksum::

    wget https://s3-us-west-2.amazonaws.com/brave-browser-apt-staging-dev/pool/main/b/brave-browser-dev/brave-browser-dev_0.50.14_amd64.deb


    wget https://s3-us-west-2.amazonaws.com/brave-brave-binaries/releases/tmp/v0.50.14/brave-browser-dev_0.50.14_amd64.deb.sha256sum

    more brave-browser-dev_0.50.14_amd64.deb.sha256sum
    319b925220d07cc4810fd9848a1d09a53d0d66e31e3ea0a8f892336fa26ac1c0 *brave-browser-dev_0.50.14_amd64.deb


    sha256sum brave-browser-dev_0.50.14_amd64.deb
    319b925220d07cc4810fd9848a1d09a53d0d66e31e3ea0a8f892336fa26ac1c0  brave-browser-dev_0.50.14_amd64.deb
