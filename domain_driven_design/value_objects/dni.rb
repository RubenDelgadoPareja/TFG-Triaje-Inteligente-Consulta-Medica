# Identificación del paciente. Posiblemente se pueda unir con nss para formar un objeto de valor que sea identificación.
# app/models/dni.rb
class DNI
attr_reader :number

def initialize(number)
    validate_number!(number)
    @number = number
end

def ==(other)
    self.class == other.class && number == other.number
end

def to_s
    number
end

private

def validate_number!(number)
    raise ArgumentError, 'Número de DNI inválido' unless 
    valid_format?(number)
end

def valid_format?(number)
    /^[0-9]{8}[A-Z]$/ === number
end
end