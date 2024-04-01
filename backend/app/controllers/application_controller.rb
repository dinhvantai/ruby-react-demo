class ApplicationController < ActionController::API
  before_action :authorized

  def current_user
    header = request.headers['Authorization']
    unless header
      return nil
    end

    token = header.split(" ")[1]
    decoded_token = JwtHelper.decode(token)
    unless decoded_token
      return nil
    end

    user_id = decoded_token['user_id']
    @user = User.find_by(id: user_id)
  end

  def authorized
    unless !!current_user
      render json: { message: 'Please log in!' }, status: :unauthorized
    end
  end
end
