# each direction is a layer in the dockerfile

FROM node:14

# app source code
WORKDIR /app

COPY package*.json ./

# Use latest version of npm
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]