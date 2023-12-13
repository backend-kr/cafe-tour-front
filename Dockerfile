FROM node:20.10

WORKDIR /app

COPY package.json yarn.lock next.config.js tsconfig.json postcss.config.js tailwind.config.ts ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
