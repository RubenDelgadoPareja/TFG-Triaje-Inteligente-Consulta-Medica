class MedicalHistory < ApplicationRecord
    belongs_to :patient
    has_many :appointments
  
    validates :risk, presence: true
  end