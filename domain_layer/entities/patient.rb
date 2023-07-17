module Domain
  module Entity
    class Patient
        attr_accessor :auth, :personal_info, :risk

        def initialize(auth, personal_info, risk)
          @auth = auth
          @personal_info = personal_info
          @risk = risk
        end

        def save()
          #Llamar Use Case de guardar -> Repositorio -> Data access -> Base de Datos
        end

    end
  end
end
