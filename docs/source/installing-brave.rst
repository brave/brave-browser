Installing Brave
################

Linux
*****

NOTE: If Brave does not start and shows an error about sandboxing, you may need
to enable `user namespaces
<https://superuser.com/questions/1094597/enable-user-namespaces-in-debian-kernel#1122977>`_. For security reasons, we do NOT recommend running with the ``--no-sandbox`` flag. For more info, see https://github.com/brave/brave-browser/issues/1986#issuecomment-445057361.

NOTE: While we recommend you to use our official packages, there's a section for unofficial package in the case where we don't ship packages for your distribution. These packages are community maintained, and therefore we take no responsibility for them.

Release Channel Installation
============================

.. highlight:: console

Ubuntu 16.04+ and Mint 18+
--------------------------
::

    curl -s https://brave-browser-apt-release.s3.brave.com/brave-core.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-release.gpg add -

    source /etc/os-release

    echo "deb [arch=amd64] https://brave-browser-apt-release.s3.brave.com/ $UBUNTU_CODENAME main" | sudo tee /etc/apt/sources.list.d/brave-browser-release-${UBUNTU_CODENAME}.list

    sudo apt update

    sudo apt install brave-keyring brave-browser

Mint 17
-------
::

    curl -s https://brave-browser-apt-release.s3.brave.com/brave-core.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-release.gpg add -

    echo "deb [arch=amd64] https://brave-browser-apt-release.s3.brave.com/ trusty main" | sudo tee /etc/apt/sources.list.d/brave-browser-release-trusty.list

    sudo apt update

    sudo apt install brave-keyring brave-browser

Fedora 28+
----------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-release.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-release.s3.brave.com/brave-core.asc

    sudo dnf install brave-keyring brave-browser

CentOS/RHEL
-----------
::

    sudo rpm --import https://brave-browser-rpm-release.s3.brave.com/brave-core.asc

    cat << EOF | sudo tee /etc/yum.repos.d/brave-browser-release.repo
    [brave-browser-release]
    name=Brave Browser Release Channel repository
    baseurl=https://brave-browser-rpm-release.s3.brave.com/x86_64/
    enabled=1
    EOF

    sudo yum install brave-keyring brave-browser

The key you're importing should have fingerprint ``D8BA D4DE 7EE1 7AF5 2A83  4B2D 0BB7 5829 C2D4 E821``.


Beta Channel Installation
=========================

.. highlight:: console

Ubuntu 16.04+ and Mint 18+
--------------------------
::

    curl -s https://brave-browser-apt-beta.s3.brave.com/brave-core-nightly.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-beta.gpg add -

    source /etc/os-release

    echo "deb [arch=amd64] https://brave-browser-apt-beta.s3.brave.com/ $UBUNTU_CODENAME main" | sudo tee /etc/apt/sources.list.d/brave-browser-beta-${UBUNTU_CODENAME}.list

    sudo apt update

    sudo apt install brave-browser-beta

Mint 17
-------
::

    curl -s https://brave-browser-apt-beta.s3.brave.com/brave-core-nightly.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-beta.gpg add -

    echo "deb [arch=amd64] https://brave-browser-apt-beta.s3.brave.com/ trusty main" | sudo tee /etc/apt/sources.list.d/brave-browser-beta-trusty.list

    sudo apt update

    sudo apt install brave-browser-beta

Fedora 28+
----------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-beta.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-beta.s3.brave.com/brave-core-nightly.asc

    sudo dnf install brave-browser-beta

CentOS/RHEL
-----------
::

    sudo rpm --import https://brave-browser-rpm-beta.s3.brave.com/brave-core-nightly.asc

    cat << EOF | sudo tee /etc/yum.repos.d/brave-browser-beta.repo
    [brave-browser-beta]
    name=Brave Browser Beta Channel repository
    baseurl=https://brave-browser-rpm-beta.s3.brave.com/x86_64/
    enabled=1
    EOF

    sudo yum install brave-browser-beta

The key you're importing should have fingerprint ``9228 DBCE 20DD E5EC 4648  8DE9 0B31 DBA0 6A8A 26F9``.


Development Channel Installation
================================

.. highlight:: console

Ubuntu 16.04+ and Mint 18+
--------------------------
::

    curl -s https://brave-browser-apt-dev.s3.brave.com/brave-core-nightly.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-dev.gpg add -

    source /etc/os-release

    echo "deb [arch=amd64] https://brave-browser-apt-dev.s3.brave.com/ $UBUNTU_CODENAME main" | sudo tee /etc/apt/sources.list.d/brave-browser-dev-${UBUNTU_CODENAME}.list

    sudo apt update

    sudo apt install brave-browser-dev

Mint 17
-------
::

    curl -s https://brave-browser-apt-dev.s3.brave.com/brave-core-nightly.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-dev.gpg add -

    echo "deb [arch=amd64] https://brave-browser-apt-dev.s3.brave.com/ trusty main" | sudo tee /etc/apt/sources.list.d/brave-browser-dev-trusty.list

    sudo apt update

    sudo apt install brave-browser-dev

Fedora 28+
----------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-dev.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-dev.s3.brave.com/brave-core-nightly.asc

    sudo dnf install brave-browser-dev

CentOS/RHEL
-----------
::

    sudo rpm --import  https://brave-browser-rpm-dev.s3.brave.com/brave-core-nightly.asc

    cat << EOF | sudo tee /etc/yum.repos.d/brave-browser-dev.repo
    [brave-browser-dev]
    name=Brave Browser Dev Channel repository
    baseurl=https://brave-browser-rpm-dev.s3.brave.com/x86_64/
    enabled=1
    EOF

    sudo yum install brave-browser-dev

The key you're importing should have fingerprint ``9228 DBCE 20DD E5EC 4648  8DE9 0B31 DBA0 6A8A 26F9``.


Nightly Channel Installation
============================

.. highlight:: console

Ubuntu 16.04+ and Mint 18+
--------------------------
::

    curl -s https://brave-browser-apt-nightly.s3.brave.com/brave-core-nightly.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-nightly.gpg add -

    source /etc/os-release

    echo "deb [arch=amd64] https://brave-browser-apt-nightly.s3.brave.com/ $UBUNTU_CODENAME main" | sudo tee /etc/apt/sources.list.d/brave-browser-nightly-${UBUNTU_CODENAME}.list

    sudo apt update

    sudo apt install brave-browser-nightly

Mint 17
-------
::

    curl -s https://brave-browser-apt-nightly.s3.brave.com/brave-core-nightly.asc | sudo apt-key --keyring /etc/apt/trusted.gpg.d/brave-browser-nightly.gpg add -

    echo "deb [arch=amd64] https://brave-browser-apt-nightly.s3.brave.com/ trusty main" | sudo tee /etc/apt/sources.list.d/brave-browser-nightly-trusty.list

    sudo apt update

    sudo apt install brave-browser-nightly

Fedora 28+
----------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-nightly.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-nightly.s3.brave.com/brave-core-nightly.asc

    sudo dnf install brave-browser-nightly

CentOS/RHEL
-----------
::

    sudo rpm --import  https://brave-browser-rpm-nightly.s3.brave.com/brave-core-nightly.asc

    cat << EOF | sudo tee /etc/yum.repos.d/brave-browser-nightly.repo
    [brave-browser-nightly]
    name=Brave Browser Nightly Channel repository
    baseurl=https://brave-browser-rpm-nightly.s3.brave.com/x86_64/
    enabled=1
    EOF

    sudo yum install brave-browser-nightly

The key you're importing should have fingerprint ``9228 DBCE 20DD E5EC 4648  8DE9 0B31 DBA0 6A8A 26F9``.


Unofficial packages
============================

.. highlight:: console

Solus 
-----------
::

    sudo eopkg it brave
    
The Solus
package is a repackaging of the .deb file in to the Solus software format (.eopkg). It is currently maintained by Jacalz.
