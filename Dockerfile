FROM node:14.15

WORKDIR /app
ADD . /app/

RUN chmod +x docker-entrypoint.sh
RUN yarn


ENV NODE_ENV production

EXPOSE 3000
CMD './docker-entrypoint.sh'
