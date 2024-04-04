# https://hub.docker.com/_/node/
FROM node:20.0-bullseye

ARG UID=1000
ARG GID=1000

WORKDIR /app


USER "${UID}:${GID}"

CMD ["yarn", "install"]

ENTRYPOINT ["/app/docker-entrypoint"]

EXPOSE 8000
CMD ["yarn", "run", "dev", "--port", "8000", "--host"]

