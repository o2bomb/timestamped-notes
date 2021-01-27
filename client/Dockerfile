FROM node:14

# Working directory for application
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Binds to port 3000
EXPOSE 3000

CMD ["yarn", "start"]