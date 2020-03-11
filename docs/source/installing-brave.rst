Installing Brave
################

Linux
*****

Brave is only supported on 64-bit AMD/Intel architectures (`amd64` / `x86_64`).

The current signing keys are also available from <https://brave.com/signing-keys/>.

Release Channel Installation
============================

.. highlight:: console

Debian 9+, Ubuntu 14.04+ and Mint 17+
-------------------------------------

If you get ``gnutls_handshake()`` errors after adding the Brave repository on Debian 9,
you may need to `uninstall old conflicting packages
<https://github.com/signalapp/Signal-Desktop/issues/2483#issuecomment-401047201>`_.

::

    sudo apt install apt-transport-https curl

    curl -s https://brave-browser-apt-release.s3.brave.com/brave-core.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-release.gpg add -

    echo "deb [arch=amd64] https://brave-browser-apt-release.s3.brave.com/ stable main" | sudo tee /etc/apt/sources.list.d/brave-browser-release.list

    sudo apt update

    sudo apt install brave-browser

Fedora 28+, CentOS/RHEL 8+
--------------------------
::

    sudo dnf install dnf-plugins-core

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

Debian 9+, Ubuntu 14.04+ and Mint 17+
-------------------------------------
::

    sudo apt install apt-transport-https curl

    curl -s https://brave-browser-apt-beta.s3.brave.com/brave-core-nightly.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-prerelease.gpg add -

    echo "deb [arch=amd64] https://brave-browser-apt-beta.s3.brave.com/ stable main" | sudo tee /etc/apt/sources.list.d/brave-browser-beta.list

    sudo apt update

    sudo apt install brave-browser-beta

Fedora 28+, CentOS/RHEL 8+
--------------------------
::

    sudo dnf install dnf-plugins-core

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


Nightly Channel Installation
============================

.. highlight:: console

Debian 9+, Ubuntu 14.04+ and Mint 17+
-------------------------------------
::

    sudo apt install apt-transport-https curl

    curl -s https://brave-browser-apt-nightly.s3.brave.com/brave-core-nightly.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-prerelease.gpg add -

    echo "deb [arch=amd64] https://brave-browser-apt-nightly.s3.brave.com/ stable main" | sudo tee /etc/apt/sources.list.d/brave-browser-nightly.list

    sudo apt update

    sudo apt install brave-browser-nightly

Fedora 28+, CentOS/RHEL 8+
--------------------------
::

    sudo dnf install dnf-plugins-core

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
