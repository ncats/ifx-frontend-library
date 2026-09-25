FROM node:22-alpine3.19 AS build

ENV npm_config_unsafe_perm=true

# Set the source folder
ARG SOURCE_FOLDER="./"

# Create app directory
WORKDIR /var/www/app

COPY ${SOURCE_FOLDER} .

# Bundle app source
RUN apk update && apk upgrade
RUN apk add --no-cache bash git openssh
#RUN npm install --unsafe-perm=true
#RUN npm config set unsafe-perm true
RUN npm i -g @angular/cli
RUN npm install -g nx
RUN npm install
#RUN nx g @nrwl/workspace:fix-configuration  ##@nrwl package is deprecated, so i don't think this does anything
RUN NODE_OPTIONS=--max_old_space_size=8192 nx run resolver:build:production --base-href=/frontend/ --verbose

FROM registry.ncats.nih.gov:5000/labshare/docker-base-web

# Install NCATS required packages
# The base image is Debian bullseye, which is EOL and was removed from the regular
# deb.debian.org/security.debian.org mirrors, so point apt at the Debian archive instead.
# Acquire::Check-Valid-Until=false works around expired InRelease files on the archive mirror.
RUN sed -i -e 's|deb.debian.org|archive.debian.org|g' -e 's|security.debian.org|archive.debian.org|g' /etc/apt/sources.list \
    && apt-get update -o Acquire::Check-Valid-Until=false && apt-get install -y net-tools

COPY --from=build /var/www/app/dist/apps/resolver/browser /var/www/app

# Add read permissions to all files under assets directory
RUN chmod -R o+r /var/www/app/assets/*
# RUN echo "Checkout assets file permissions" && ls -la /var/www/app/assets/*
