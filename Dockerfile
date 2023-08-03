# Dockerfile

# Utilizar la imagen oficial de Ruby como imagen base
FROM ruby:alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR $HOME/TFG-Triage-Inteligente-Consulta-Medica

# Copiamos las dependencias necesarias y las instalamos (Gemfile)
COPY Gemfile Gemfile.lock ./

# Añadimos al Gemfile la gema bundler para instalar el resto
RUN gem install bundler

# Ejecutamos las dependencias
RUN bundler install

# Copiamos el resto
COPY . .

# Crear un usuario no privilegiado
RUN adduser -D usertfg

# Cambiar al usuario no privilegiado
USER usertfg

# Comandos para ejecutar el servidor cuando se construya la imagen
CMD ["ruby", "app.rb"]

