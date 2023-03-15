FROM node:13.12.0-alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install -g --silent
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./

ENV NODE_ENV production
RUN npm run build

EXPOSE 3000

# start app
CMD [ "npx", "serve", "build" ]
