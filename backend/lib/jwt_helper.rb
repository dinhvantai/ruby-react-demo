# frozen_string_literal: true

class JwtHelper
  ALGORITHM = 'HS256'

  def self.encode(payload)
    JWT.encode(payload, auth_secret, ALGORITHM)
  end

  def self.decode(token)
    JWT.decode(token, auth_secret, true, { algorithm: ALGORITHM }).first
  rescue JWT::DecodeError
    nil
  end

  def self.auth_secret
    Rails.application.credentials.jwt_key
  end
end
