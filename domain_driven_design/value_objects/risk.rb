#El riesgo es un valor calculado y comparable necesario para ordenar las colas de citas.
# Principalmente dependerá del perfil del paciente y su historial sanitario
# app/models/risk.rb
class Risk
    attr_reader :value, :name, :description
  
    def initialize(value, name, description)
      @value = value
      @name = name
      @description = description
    end
  end