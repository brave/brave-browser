Installing Brave
################

Linux
*****

NOTE: If Brave does not start and shows an error about sandboxing, you may need
to enable `user namespaces
<https://superuser.com/questions/1094597/enable-user-namespaces-in-debian-kernel#1122977>`_. For security reasons, we do NOT recommend running with the ``--no-sandbox`` flag. For more info, see https://github.com/brave/brave-browser/issues/1986#issuecomment-445057361.


Release Channel Installation
============================

.. highlight:: console

Ubuntu 16.04+
-------------
::

    curl -s https://brave-browser-apt-release.s3.brave.com/brave-core.asc | sudo apt-key add -

    echo "deb [arch=amd64] https://brave-browser-apt-release.s3.brave.com/ `lsb_release -sc` main" | sudo tee /etc/apt/sources.list.d/brave-browser-release-`lsb_release -sc`.list

    sudo apt update

    sudo apt install brave-browser brave-keyring


Mint 17+
--------
::

    curl -s https://brave-browser-apt-release.s3.brave.com/brave-core.asc | sudo apt-key add -

    UBUNTU_CODENAME=$( (grep DISTRIB_CODENAME /etc/upstream-release/lsb-release || grep DISTRIB_CODENAME /etc/lsb-release) 2>/dev/null | cut -d'=' -f2 )

    echo "deb [arch=amd64] https://brave-browser-apt-release.s3.brave.com/ $UBUNTU_CODENAME main" | sudo tee /etc/apt/sources.list.d/brave-browser-release-$UBUNTU_CODENAME.list

    sudo apt update

    sudo apt install brave-browser brave-keyring


Fedora 28+
----------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-release.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-release.s3.brave.com/brave-core.asc

    sudo dnf install brave-browser brave-keyring


Centos/RHel
----------
::

    sudo rpm --import https://brave-browser-rpm-release.s3.brave.com/brave-core.asc

    sudo cat << EOF >  /etc/yum.repos.d/Brave.repo
    [brave]
    name=Brave Browser repo
    baseurl=https://brave-browser-rpm-release.s3.brave.com/x86_64/
    enabled=1
    EOF

    sudo yum install brave-browser brave-keyring

The key you're importing should have fingerprint ``D8BA D4DE 7EE1 7AF5 2A83  4B2D 0BB7 5829 C2D4 E821``.

Beta Channel Installation
================================

.. highlight:: console

Ubuntu 16.04+
-------------
::

    curl -s https://brave-browser-apt-beta.s3.brave.com/brave-core-nightly.asc | sudo apt-key add -

    echo "deb [arch=amd64] https://brave-browser-apt-beta.s3.brave.com/ `lsb_release -sc` main" | sudo tee /etc/apt/sources.list.d/brave-browser-beta-`lsb_release -sc`.list

    sudo apt update

    sudo apt install brave-browser-beta


Mint 17+
--------
::

    curl -s https://brave-browser-apt-beta.s3.brave.com/brave-core-nightly.asc | sudo apt-key add -

    UBUNTU_CODENAME=$( (grep DISTRIB_CODENAME /etc/upstream-release/lsb-release || grep DISTRIB_CODENAME /etc/lsb-release) 2>/dev/null | cut -d'=' -f2 )

    echo "deb [arch=amd64] https://brave-browser-apt-beta.s3.brave.com/ $UBUNTU_CODENAME main" | sudo tee /etc/apt/sources.list.d/brave-browser-beta-$UBUNTU_CODENAME.list

    sudo apt update

    sudo apt install brave-browser-beta


Fedora 28+
----------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-beta.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-beta.s3.brave.com/brave-core-nightly.asc

    sudo dnf install brave-browser-beta

Centos/RHel
----------
::

    sudo rpm --import https://brave-browser-rpm-beta.s3.brave.com/brave-core-nightly.asc

    sudo cat << EOF >  /etc/yum.repos.d/Brave.repo
    [brave]
    name=Brave Browser repo
    baseurl=https://brave-browser-rpm-beta.s3.brave.com/x86_64/
    enabled=1
    EOF

    sudo yum install brave-browser-beta

The key you're importing should have fingerprint ``9228 DBCE 20DD E5EC 4648  8DE9 0B31 DBA0 6A8A 26F9``.

Development Channel Installation
================================

.. highlight:: console

Ubuntu 16.04+
-------------
::

    curl -s https://brave-browser-apt-dev.s3.brave.com/brave-core-nightly.asc | sudo apt-key add -

    echo "deb [arch=amd64] https://brave-browser-apt-dev.s3.brave.com/ `lsb_release -sc` main" | sudo tee /etc/apt/sources.list.d/brave-browser-dev-`lsb_release -sc`.list

    sudo apt update

    sudo apt install brave-browser-dev


Mint 17+
--------
::

    curl -s https://brave-browser-apt-dev.s3.brave.com/brave-core-nightly.asc | sudo apt-key add -

    UBUNTU_CODENAME=$( (grep DISTRIB_CODENAME /etc/upstream-release/lsb-release || grep DISTRIB_CODENAME /etc/lsb-release) 2>/dev/null | cut -d'=' -f2 )

    echo "deb [arch=amd64] https://brave-browser-apt-dev.s3.brave.com/ $UBUNTU_CODENAME main" | sudo tee /etc/apt/sources.list.d/brave-browser-dev-$UBUNTU_CODENAME.list

    sudo apt update

    sudo apt install brave-browser-dev


Fedora 28+
----------
::

    sudo dnf config-manager --add-repo https://brave-browser-rpm-dev.s3.brave.com/x86_64/

    sudo rpm --import https://brave-browser-rpm-dev.s3.brave.com/brave-core-nightly.asc

    sudo dnf install brave-browser-dev


Centos/RHel
----------
::

    sudo rpm --import  https://brave-browser-rpm-dev.s3.brave.com/brave-core-nightly.asc

    sudo cat << EOF >  /etc/yum.repos.d/Brave.repo
    [brave]
    name=Brave Browser repo
    baseurl=https://brave-browser-rpm-dev.s3.brave.com/x86_64/
    enabled=1
    EOF
    sudo yum install brave-browser-dev

The key you're importing should have fingerprint ``9228 DBCE 20DD E5EC 4648  8DE9 0B31 DBA0 6A8A 26F9``.
