FROM ruby:3.0.2

RUN apt-get update && apt-get install -y nano

RUN mkdir TFG-Triage-Inteligente-Consulta-Medica

WORKDIR /TFG-Triage-Inteligente-Consulta-Medica

COPY . /TFG-Triage-Inteligente-Consulta-Medica

RUN gem install bundler

RUN bundler install



