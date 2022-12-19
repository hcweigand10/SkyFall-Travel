# each direction is a layer in the dockerfile

# base image
# official parent pulled from dockerhub, which stores official images to build up out application from 
FROM node:14

# app source code
# any subsequent commands will start form this work directory
WORKDIR /app

# Cache package and package lock files
# first argument: what you want to copy
# second argument: where you want to copy to
COPY package*.json ./

# command to run which runs in the workding directory
RUN npm install

# copy everything within the app
COPY . .

# tells Docker that a container listens for traffic on the specified port.
EXPOSE 8080

# command: how to run application; done in exec form (preferred);
CMD ["npm", "start"]

# copy . . meaning
# It means the same thing yes, the dot is “where i am now”
# So it will copy everything from the same place as the dockerfile, to “where i am now” in the container.

# The “where i am now” in the image/container is defined by https://docs.docker.com/engine/reference/builder/#workdir 484

# So if you set:
# WORKDIR /tmp
# and do
# COPY . .

# It will copy everything in the current folder, to /tmp

# Hope that makes sense :slight_smile: