#Es una entidad que tiene varios médicos asignados
# Tiene una clínica asignada
# Debe poder identificarse
# app/models/sanitario.rb
class Doctor < ApplicationRecord
    has_many :patients
    has_many :appointments
    belongs_to :medical_center
  
    validates :dni, presence: true, uniqueness: true
  
    def initialize(dni)
      @dni = DNI.new(dni)
    end
  
    def dni
      @dni.numero
    end
  
    def dni=(numero)
      @dni = DNI.new(numero)
    end
  end