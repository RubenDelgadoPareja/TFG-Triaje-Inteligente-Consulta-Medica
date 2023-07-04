# app/models/paciente.rb
class Patient < ApplicationRecord
    # Relaciones
    has_many :doctor, presence: true
    has_many :medical_center, presence: true
    has_many :appointments
    has_one :medical_history
    
  
    # Validaciones
    validates :dni, presence: true, uniqueness: true
    validates :ssn, presence: true, uniqueness: true
    validates :name, presence: true
    validates :last_name, presence: true
  
    # Métodos de instancia
    def full_name
      "#{name} #{last_name}"
    end
  
    def change_doctor(new_doctor)
      self.doctor = new_doctor
      save
    end
  
    def change_medical_center(new_medical_center)
      self.medical_center = new_medical_center
      save
    end
  end  