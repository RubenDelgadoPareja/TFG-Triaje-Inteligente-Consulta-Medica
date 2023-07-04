# Estoy pensando si realmente es una Entidad o simplemente una Agregación de Entidades
# app/models/appointment.rb
class Appointment < ApplicationRecord
    belongs_to :patient
    belongs_to :doctor
    belongs_to :medical_center
    belongs_to :medical_history

    attr_accessor :date
    attr_accessor :description
  end