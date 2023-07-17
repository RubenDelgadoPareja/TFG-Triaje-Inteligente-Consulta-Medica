module Domain
  module Entity
    class Appointment
        attr_accessor :patient, :doctor, :date, :medical_center

        def initialize(patient, doctor, date)
          @patient = patient
          @doctor = doctor
          @date = date
        end

        def save()
          #Llamar Use Case de guardar -> Repositorio -> Data access -> Base de Datos
        end

    end
  end
end
