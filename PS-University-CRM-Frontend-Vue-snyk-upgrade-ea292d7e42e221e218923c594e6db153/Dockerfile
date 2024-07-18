FROM node:14 as frontend-builder

RUN npm install -g http-server


WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm run build

CMD ["npm", "run", "serve"]
