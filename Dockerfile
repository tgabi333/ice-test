FROM ubuntu:xenial

ARG DEBIAN_FRONTEND=noninteractive

RUN sed -i 's/http:\/\/archive.ubuntu.com\/ubuntu\//http:\/\/hu.archive.ubuntu.com\/ubuntu\//' /etc/apt/sources.list
RUN apt-get update && apt-get install -y locales && locale-gen en_US.UTF-8
ENV LANG=en_US.UTF-8 LANGUAGE=en_US:en LC_ALL=en_US.UTF-8

ENV NODE_ENV docker

# update and install needed software
RUN apt-get update \
    && apt-get -y upgrade \
    && apt-get -y install apt-transport-https wget apt-utils nano net-tools \
    && echo "deb http://nginx.org/packages/ubuntu/ xenial nginx" | tee /etc/apt/sources.list.d/nginx.list \
    && wget -q -O - http://nginx.org/keys/nginx_signing.key | apt-key add - \
    && echo "deb https://deb.nodesource.com/node_6.x xenial main" | tee /etc/apt/sources.list.d/nodesource.list \
    && wget -q -O - https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && wget -q -O - https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && apt-get update \
    && apt-get -y install nginx nodejs build-essential yarn supervisor git


# install needes software
RUN mkdir /workspace/
RUN usermod -aG www-data nginx
COPY nginx/* /etc/nginx/conf.d/
COPY generate_certs.sh /workspace/
RUN mkdir -p /var/log/supervisor
RUN useradd ubuntu
RUN usermod -aG www-data ubuntu

COPY nginx.conf /etc/nginx/conf.d/
COPY supervisor.conf /etc/supervisor/conf.d/

RUN mkdir /workspace/cert \ && /workspace/generate_certs.sh

WORKDIR /workspace/webrtc-turn-test

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]