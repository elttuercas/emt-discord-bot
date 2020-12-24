FROM library/node:latest

RUN mkdir /bot

COPY ./node_modules /bot/node_modules
COPY ./src /bot/src

# For docker-compose local testing.
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /bot/src
RUN chmod +x /bot/src/wait-for-it.sh

COPY ./config.json /bot
COPY ./private_config.json /bot

WORKDIR /bot/src
CMD ["node", "bot.js"]
