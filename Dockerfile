FROM library/node:latest

RUN mkdir /bot

COPY ./node_modules /bot/node_modules
COPY ./src /bot/src
COPY ./config.json /bot
COPY ./private_config.json /bot

WORKDIR /bot/src
CMD ["node", "bot.js"]
