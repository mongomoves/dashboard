FROM node:latest
RUN mkdir /node
WORKDIR /node
COPY package.json /node
RUN npm install
COPY . /node
EXPOSE 3001
CMD ["npm", "start"]