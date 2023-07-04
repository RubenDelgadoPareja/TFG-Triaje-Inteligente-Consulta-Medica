# app/models/medical_center.rb
class MedicalCenter < ApplicationRecord
    has_many :doctors
    has_many :patients
    has_many :appointments
  
    # Atributo de clase
    attr_accessor :address
  
    # Getter y setter para el atributo de clase address
    def address=(address_params)
      @address = Address.new(
        address_params[:country],
        address_params[:postal_code],
        address_params[:street],
        address_params[:number]
      )
    end
  
    def full_address
      address.full_address if address
    end
  end
  