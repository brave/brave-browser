FROM node:8-stretch

RUN apt-get update && apt-get install -y \
  bison \
  build-essential \
  curl \
  g++-multilib \
  gcc-multilib \
  git \
  gperf \
  libgnome-keyring-dev \
  libnotify-dev \
  libssl-dev \
  lsb-release \
  ninja-build \
  python-pip \
  sudo

RUN npm install -g node-gyp@3.3.1
RUN pip install Jinja2==2.8.1

RUN curl -sSf https://static.rust-lang.org/rustup.sh | sh
RUN cargo install sccache
ENV PATH="/root/.cargo/bin:${PATH}"
RUN echo "sccache = /root/.cargo/bin/sccache" > /root/.npmrc

# BLB source code. Mount ./browser-laptop-bootstrap from the host to here.
WORKDIR /src
VOLUME /src

# WILL BREAK USE base64 to decode
ADD https://chromium.googlesource.com/chromium/src.git/+/master/build/install-build-deps.sh /src/scripts/

RUN /src/scripts/install-build-deps.sh

# Build cache. Mount ./sccache from the host to here.
VOLUME /root/.cache/sccache

CMD bash
