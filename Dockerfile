FROM artifactory-pr-build.lb.cumuli.be:8081/acd-docker/node:12

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

ARG VERSION
ARG REPO

COPY .npmrc /root/.npmrc
COPY .gitconfig /root/.gitconfig
COPY .git-credentials /root/.git-credentials

WORKDIR /home/node/

RUN git clone ${REPO} app

WORKDIR /home/node/app

RUN npm install \
    && npm run release:testless -- ${VERSION}
