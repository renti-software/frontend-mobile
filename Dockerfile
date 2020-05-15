# base image
FROM node as builder

ARG PLATFORM=web

# ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.168.0.197"

EXPOSE 19000 19001 19002

# set working directory
WORKDIR /app/

# Copy all important files for the installation
COPY renti/package*.json ./

RUN npm install 
RUN npm install -g expo-cli

COPY renti/ ./
RUN npm audit fix

CMD ["expo", "start", "--tunnel"]
