FROM node:16-alpine 
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH

COPY . .
RUN npm ci 

ENV NODE_ENV production
RUN npm run build

EXPOSE 3000

# start app
CMD [ "npx", "serve", "build" ]
