FROM node:10

#RUN apt update && apt install python3.6 python3-pip
RUN  apt-get update && apt-get -y upgrade && apt-get install -y python3-pip
RUN pip3 install pymongo dnspython 

RUN python3 -V
RUN pip3 -V
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8000
CMD [ "node","src/index.js" ]

USER node