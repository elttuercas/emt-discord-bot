FROM library/node:latest

RUN mkdir /bot

COPY ./node_modules /bot/node_modules
COPY ./src /bot/src

# For docker-compose local testing.
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/81b1373f17855a4dc21156cfe1694c31d7d1792e/wait-for-it.sh /bot/src
RUN chmod +x /bot/src/wait-for-it.sh

COPY ./config.json /bot
COPY ./private-config.json /bot

WORKDIR /bot/src
CMD ["node", "bot.js"]
