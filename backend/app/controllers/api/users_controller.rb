class Api::UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]

  # POST /api/users
  def create
    @user = User.find_by(email: user_params[:email])

    if @user.nil?
      @user = User.new(user_params)

      unless @user.save!
        return render json: { message: "Can't create user!" }, status: :unprocessable_entity
      end
    end

    unless @user.authenticate(user_params[:password])
      return render json: { message: 'Wrong email or password!' }, status: :bad_request
    end

    @user.token = JwtHelper.encode({ user_id: @user.id })

    render json: @user, serializer: UserSerializer
  end

  def me
    render json: current_user, status: :ok
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
