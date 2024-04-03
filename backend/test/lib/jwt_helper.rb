require "test_helper"

class JwtHelperTest < ActiveSupport::TestCase
  test "encode" do
    payload = { 'user_id': 1 }
    token = JwtHelper.encode(payload)
    assert_not_nil token
  end

  test "encode and decode" do
    payload = { 'user_id': 1 }
    token = JwtHelper.encode(payload)
    decoded_payload = JwtHelper.decode(token)
    assert_equal payload[:user_id], decoded_payload['user_id']
  end

  test "decode with wrong token" do
    decoded_payload = JwtHelper.decode('wrong_token')
    assert_nil decoded_payload
  end
end
