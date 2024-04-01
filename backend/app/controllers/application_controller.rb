class ApplicationController < ActionController::API
  before_action :authorized

  ALGORITHM = 'HS256'

  def encode_token(payload)
    JWT.encode(payload, auth_secret, ALGORITHM)
  end

  def decoded_token
    header = request.headers['Authorization']
    if header
      token = header.split(" ")[1]
      begin
        JWT.decode(token, auth_secret, true, { algorithm: ALGORITHM })
           .first
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def current_user
    if decoded_token
      user_id = decoded_token['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  def authorized
    unless !!current_user
      render json: { message: 'Please log in!' }, status: :unauthorized
    end
  end

  def auth_secret
    Rails.application.credentials.jwt_key
  end
end
