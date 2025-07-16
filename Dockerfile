FROM node:22-alpine AS development

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm install

RUN npm install crypto

COPY . .

RUN npm run build

FROM node:22-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production
RUN npm install crypto

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main.js"]