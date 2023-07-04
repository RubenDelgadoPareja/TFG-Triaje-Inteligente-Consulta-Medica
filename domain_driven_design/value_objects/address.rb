# La dirección incluye código postal, calle y número (lat y lon no es necesario)
# Es necesario añadir la gema 'validates_zipcode' para validar que existe el codigo postal en España
# app/models/address.rb
class Address
    attr_reader :country, :postal_code, :street_number, :street
    validates :codigo_postal, zipcode: { country_code: :es }
  
    def initialize(country, postal_code, street_number, street)
      @country = country
      @postal_code = postal_code
      @street_number = street_number
      @street = street
    end
  
  end
  