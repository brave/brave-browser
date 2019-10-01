Installing Brave
################

Linux
*****

Brave supports 64-bit Linux distributions only.

NOTE: If Brave does not start and shows an error about sandboxing, you may need
to enable `user namespaces
<https://superuser.com/questions/1094597/enable-user-namespaces-in-debian-kernel#1122977>`_. For security reasons, we do NOT recommend running with the ``--no-sandbox`` flag. For more info, see https://github.com/brave/brave-browser/issues/1986#issuecomment-445057361.

Release Channel Installation
============================

.. highlight:: console

Ubuntu 16.04+ and Mint 18+
--------------------------
::

    sudo apt install apt-transport-https curl

    curl -s https://brave-browser-apt-release.s3.brave.com/brave-core.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-release.gpg add -

    source /etc/os-release

    echo "deb [arch=amd64] https://brave-browser-apt-release.s3.brave.com/ $UBUNTU_CODENAME main" | sudo tee /etc/apt/sources.list.d/brave-browser-release-${UBUNTU_CODENAME}.list

    sudo apt update

    sudo apt install brave-browser

Debian 9, Ubuntu 14.04 and Mint 17
----------------------------------

If you get ``gnutls_handshake()`` errors after adding the Brave repository on Debian 9,
you may need to `uninstall old conflicting packages
<https://github.com/signalapp/Signal-Desktop/issues/2483#issuecomment-401047201>`_.

::

    sudo apt install apt-transport-https curl

    curl -s https://brave-browser-apt-release.s3.brave.com/brave-core.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-release.gpg add -

    echo "deb [arch=amd64] https://brave-browser-apt-release.s3.brave.com/ trusty main" | sudo tee /etc/apt/sources.list.d/brave-browser-release-trusty.list

    sudo apt update

    sudo apt install brave-browser

Fedora 28+, CentOS/RHEL 8+
--------------------------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-release.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-release.s3.brave.com/brave-core.asc

    sudo dnf install brave-browser

OpenSUSE 15+
------------
::

    sudo zypper install curl

    sudo rpm --import https://brave-browser-rpm-release.s3.brave.com/brave-core.asc

    sudo zypper addrepo https://brave-browser-rpm-release.s3.brave.com/x86_64/ brave-browser

    sudo zypper install brave-browser


Beta Channel Installation
=========================

.. highlight:: console

Ubuntu 16.04+ and Mint 18+
--------------------------
::

    sudo apt install apt-transport-https curl

    curl -s https://brave-browser-apt-beta.s3.brave.com/brave-core-nightly.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-beta.gpg add -

    source /etc/os-release

    echo "deb [arch=amd64] https://brave-browser-apt-beta.s3.brave.com/ $UBUNTU_CODENAME main" | sudo tee /etc/apt/sources.list.d/brave-browser-beta-${UBUNTU_CODENAME}.list

    sudo apt update

    sudo apt install brave-browser-beta

Debian 9, Ubuntu 14.04 and Mint 17
----------------------------------
::

    sudo apt install apt-transport-https curl

    curl -s https://brave-browser-apt-beta.s3.brave.com/brave-core-nightly.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-beta.gpg add -

    echo "deb [arch=amd64] https://brave-browser-apt-beta.s3.brave.com/ trusty main" | sudo tee /etc/apt/sources.list.d/brave-browser-beta-trusty.list

    sudo apt update

    sudo apt install brave-browser-beta

Fedora 28+, CentOS/RHEL 8+
--------------------------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-beta.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-beta.s3.brave.com/brave-core-nightly.asc

    sudo dnf install brave-browser-beta

OpenSUSE 15+
------------
::

    sudo zypper install curl

    sudo rpm --import https://brave-browser-rpm-beta.s3.brave.com/brave-core-nightly.asc

    sudo zypper addrepo https://brave-browser-rpm-beta.s3.brave.com/x86_64/ brave-browser-beta

    sudo zypper install brave-browser-beta


Development Channel Installation
================================

.. highlight:: console

Ubuntu 16.04+ and Mint 18+
--------------------------
::

    sudo apt install apt-transport-https curl

    curl -s https://brave-browser-apt-dev.s3.brave.com/brave-core-nightly.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-dev.gpg add -

    source /etc/os-release

    echo "deb [arch=amd64] https://brave-browser-apt-dev.s3.brave.com/ $UBUNTU_CODENAME main" | sudo tee /etc/apt/sources.list.d/brave-browser-dev-${UBUNTU_CODENAME}.list

    sudo apt update

    sudo apt install brave-browser-dev

Debian 9, Ubuntu 14.04 and Mint 17
----------------------------------
::

    sudo apt install apt-transport-https curl

    curl -s https://brave-browser-apt-dev.s3.brave.com/brave-core-nightly.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-dev.gpg add -

    echo "deb [arch=amd64] https://brave-browser-apt-dev.s3.brave.com/ trusty main" | sudo tee /etc/apt/sources.list.d/brave-browser-dev-trusty.list

    sudo apt update

    sudo apt install brave-browser-dev

Fedora 28+, CentOS/RHEL 8+
--------------------------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-dev.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-dev.s3.brave.com/brave-core-nightly.asc

    sudo dnf install brave-browser-dev

OpenSUSE 15+
------------
::

    sudo zypper install curl

    sudo rpm --import https://brave-browser-rpm-dev.s3.brave.com/brave-core-nightly.asc

    sudo zypper addrepo https://brave-browser-rpm-dev.s3.brave.com/x86_64/ brave-browser-dev

    sudo zypper install brave-browser-dev


Nightly Channel Installation
============================

.. highlight:: console

Ubuntu 16.04+ and Mint 18+
--------------------------
::

    sudo apt install apt-transport-https curl

    curl -s https://brave-browser-apt-nightly.s3.brave.com/brave-core-nightly.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-nightly.gpg add -

    source /etc/os-release

    echo "deb [arch=amd64] https://brave-browser-apt-nightly.s3.brave.com/ $UBUNTU_CODENAME main" | sudo tee /etc/apt/sources.list.d/brave-browser-nightly-${UBUNTU_CODENAME}.list

    sudo apt update

    sudo apt install brave-browser-nightly

Debian 9, Ubuntu 14.04 and Mint 17
----------------------------------
::

    sudo apt install apt-transport-https curl

    curl -s https://brave-browser-apt-nightly.s3.brave.com/brave-core-nightly.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-nightly.gpg add -

    echo "deb [arch=amd64] https://brave-browser-apt-nightly.s3.brave.com/ trusty main" | sudo tee /etc/apt/sources.list.d/brave-browser-nightly-trusty.list

    sudo apt update

    sudo apt install brave-browser-nightly

Fedora 28+, CentOS/RHEL 8+
--------------------------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-nightly.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-nightly.s3.brave.com/brave-core-nightly.asc

    sudo dnf install brave-browser-nightly

OpenSUSE 15+
------------
::

    sudo zypper install curl

    sudo rpm --import https://brave-browser-rpm-nightly.s3.brave.com/brave-core-nightly.asc

    sudo zypper addrepo https://brave-browser-rpm-nightly.s3.brave.com/x86_64/ brave-browser-nightly

    sudo zypper install brave-browser-nightly


Unofficial packages
============================

NOTE: While we recommend you to use our official packages, there's a section for unofficial package in the case where we don't ship packages for your distribution. These packages are community maintained, and therefore we take no responsibility for them.

.. highlight:: console

Solus 
-----------
::

    sudo eopkg it brave
    
The Solus
package is a repackaging of the .deb file in to the Solus software format (.eopkg). It is currently maintained by Jacalz.
