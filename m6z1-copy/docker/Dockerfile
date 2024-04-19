FROM node:16

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# node index.js
CMD ["node", "index.js"]