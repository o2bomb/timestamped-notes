FROM node:14

# Working directory for application
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Binds to port 5000
EXPOSE 5000

CMD ["yarn", "start"]