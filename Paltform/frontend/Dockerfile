FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install react-router-dom && npm install

COPY . .

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

RUN npm run build

EXPOSE 3000

RUN npm install -g serve
CMD ["/wait-for-it.sh", "backend:8080", "--", "serve", "-s", "build"]
