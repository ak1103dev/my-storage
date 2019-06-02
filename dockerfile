FROM node:8

WORKDIR /app

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y unoconv
RUN apt-get install -y ffmpeg
RUN apt-get install -y imagemagick

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

CMD ["npm", "start"]
