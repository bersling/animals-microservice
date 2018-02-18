FROM node:8

COPY package.json /app/package.json
COPY src /app/src
WORKDIR /app
ENV NODE_ENV production
RUN npm install

EXPOSE 57253

HEALTHCHECK CMD curl --fail http://localhost:57253/ || exit 1

CMD ["npm", "start"]
