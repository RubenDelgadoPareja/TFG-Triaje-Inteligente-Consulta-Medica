# Abreviación de nuúmero de la seguridad social en inglés . También es necesario para la identificación
# app/models/ssn.rb
class SSN
    attr_reader :numero
  
    def initialize(numero)
      # Validar y asignar el número de seguridad social
      @numero = numero
    end

    def def valid_format?(number)
        # Expresión regular para validar el formato de un número de la seguridad social en España
        number === /^(?:\d{2}\d{2})(?:\d{8})$/
    end
end