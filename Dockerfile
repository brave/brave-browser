FROM debian:buster
LABEL name "Brave's PageGraph"

# Create non-root user
ARG USER=docker
ARG UID=1000
ARG GID=1000
ARG PW=docker

RUN useradd -m ${USER} --uid=${UID} && echo "${USER}:${PW}" | \
      chpasswd

# Install dependencies
RUN apt update &&\
    apt install -y \
        git \
        pkg-config \
        gperf \
        libxcursor1 \
        build-essential \
        zlib1g-dev \
        libncurses5-dev \
        libgdbm-dev \
        libnss3-dev \
        libssl-dev \
        libsqlite3-dev \
        libreadline-dev \
        libffi-dev \
        curl \
        libbz2-dev \
        xvfb \
        gconf-service \
        libasound2 \
        libatk1.0-0 \
        libc6 \
        libcairo2 \
        libcups2 \
        libdbus-1-3 \
        libexpat1 \
        libfontconfig1 \
        libgcc1 \
        libgconf-2-4 \
        libgdk-pixbuf2.0-0 \
        libglib2.0-0 \
        libgtk-3-0 \
        libnspr4 \
        libpango-1.0-0 \
        libpangocairo-1.0-0 \
        libstdc++6 \
        libx11-6 \
        libx11-xcb1 \
        libxcb1 \
        libxcomposite1 \
        libxcursor1 \
        libxdamage1 \
        libxext6 \
        libxfixes3 \
        libxi6 \
        libxrandr2 \
        libxrender1 \
        libxss1 \
        libxtst6 \
        ca-certificates \
        fonts-liberation \
        libappindicator1 \
        libnss3 \
        lsb-release \
        xdg-utils \
        wget \
        libgbm-dev

# Install Python 3.8 required by Brave build
WORKDIR /root/
RUN curl -O https://www.python.org/ftp/python/3.8.2/Python-3.8.2.tar.xz
RUN tar -xf Python-3.8.2.tar.xz
WORKDIR /root/Python-3.8.2
RUN ./configure --enable-optimizations
RUN make -j 4
RUN make altinstall

# Install Node 14
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt update &&\
    apt install -y nodejs python python-pip &&\
    pip install requests

# Clone the brave-browser `page-graph` branch and build
WORKDIR /home/docker/
RUN git clone -b page-graph https://github.com/brave/brave-browser
WORKDIR /home/docker/brave-browser
RUN chown -R docker /home/docker/brave-browser
RUN npm install
USER ${UID}:${GID}
RUN npm run init
RUN npm run build -- Static
