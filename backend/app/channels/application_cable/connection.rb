module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      token = @request.params['token'] || cookies['token']

      decoded_token = JwtHelper.decode(token)

      if decoded_token
        user_id = decoded_token['user_id']
        @user = User.find_by(id: user_id)
      else
        reject_unauthorized_connection
      end
    end
  end
end
