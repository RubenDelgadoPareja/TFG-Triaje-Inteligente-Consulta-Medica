module Domain
    module ValueObject
        class Auth
            attr_accessor :dni, :ssn, :password

            def initialize(dni, ssn, password)
                @dni = dni
                @ssn = ssn
                @password = password
            end

        end
    end
end
