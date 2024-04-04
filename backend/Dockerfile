ARG RUBY_VERSION=3.3.0

ARG UID=1000
ARG GID=1000

FROM ruby:$RUBY_VERSION-bullseye as base

ENV GEM_HOME="/app/.bundle"
ENV PATH $GEM_HOME/bin:$GEM_HOME/gems/bin:$PATH

RUN gem install bundler rails rake

ENV RAILS_ROOT /app
WORKDIR /app


USER "${UID}:${GID}"

# Entrypoint prepares the database.
ENTRYPOINT ["/app/bin/docker-entrypoint"]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["./bin/rails", "server", "--binding=0.0.0.0", "-p", "3000"]