require "test_helper"

module ApplicationCable
  class ConnectionTest < ActionCable::Connection::TestCase
    test "connects with cookie token" do
      user = User.find(1)
      token = JwtHelper.encode({ user_id: user.id })

      cookies[:token] = token

      connect
      assert_equal connection.current_user.id, user.id
    end

    test "connects without cookie token" do
      assert_reject_connection { connect }
    end

    test "connects with wrong cookie token" do
      cookies[:token] = "wrong token"

      assert_reject_connection { connect }
    end
  end
end
