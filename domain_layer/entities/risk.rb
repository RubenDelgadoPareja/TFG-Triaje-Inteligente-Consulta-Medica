#El riesgo es un valor calculado y comparable necesario para ordenar las colas de citas.
# Principalmente dependerá del perfil del paciente y su historial sanitario
# app/models/risk.rb
module Domain
  module ValueObject
    class Risk
        attr_accessor :value

        def initialize(value){
          @value = value
        }
    end
  end
end
