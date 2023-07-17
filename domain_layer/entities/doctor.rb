
module Domain
  module ValueObject
    class Doctor
        attr_accessor :personal_info

        def initialize(personal_info)
          @personal_info = personal_info
        end

    end
  end
end
