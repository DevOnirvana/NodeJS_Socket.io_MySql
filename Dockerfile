FROM mhart/alpine-node:6

RUN apk add --no-cache make gcc g++ python

WORKDIR /node
COPY . .

RUN npm install

EXPOSE 3000
CMD ["node", "index.js"]