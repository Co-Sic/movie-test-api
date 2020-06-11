FROM node:13.12
WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

COPY tsconfig.json ./
COPY src ./src

ENTRYPOINT ["npm", "run", "start", "--"]
