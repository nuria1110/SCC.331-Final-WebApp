FROM node:16-alpine 
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH

COPY . .

ENV NODE_ENV production
RUN npm install
RUN npm ci 
RUN npm run build

EXPOSE 3000

# start app
CMD [ "npx", "serve", "build" ]
