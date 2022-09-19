FROM node:14-alpine

WORKDIR /usr/app

RUN echo "Installing common deps" \
    && apk add -q build-base

COPY package.json package-lock.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["npm","run","start"]
#CMD ["/bin/sh","run.sh"]
