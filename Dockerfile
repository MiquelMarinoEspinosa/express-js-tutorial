FROM node:current-slim

ARG UNAME=""
ARG UID=""
ARG GID=""

ARG GIT_USER_NAME=""
ARG GIT_USER_EMAIL=""

RUN apt-get update && apt-get install -y \
    git

RUN groupadd -g $GID -o $UNAME
RUN useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME
USER $UNAME
RUN git config --global user.name ${GIT_USER_NAME}
RUN git config --global user.email ${GIT_USER_EMAIL}
RUN git config --global --add safe.directory /app
ENV PATH="$PATH:/app/node_modules/.bin"

WORKDIR /app