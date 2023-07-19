FROM ruby:3.0.2
RUN apt-get update && apt-get install -y nano
RUN gem install bundler
RUN mkdir /triage_backend
WORKDIR /triage_backend
