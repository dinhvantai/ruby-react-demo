require "test_helper"

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  PASSWORD = "password"

  setup do
    @user = User.create({ email: Faker::Internet.email, password: PASSWORD })
  end

  test "should login and return user includes token with email existed" do
    post '/api/users', params: { user: { email: @user[:email], password: PASSWORD } }, as: :json

    assert_response :success

    token = JSON.parse(response.body)['token']
    assert_not_nil token

    decode = JwtHelper.decode(token)
    assert_equal decode['user_id'], @user[:id]
  end

  test "should create and return user includes token without email existed" do
    post '/api/users', params: { user: { email: Faker::Internet.email, password: PASSWORD } }, as: :json

    assert_response :success

    token = JSON.parse(response.body)['token']
    assert_not_nil token

    decode = JwtHelper.decode(token)
    assert_not_equal decode['user_id'], @user[:id]
  end

  test "should return a error when wrong password" do
    post '/api/users', params: { user: { email: @user.email, password: 'wrong' } }, as: :json

    assert_response :bad_request
  end

  test "should return the user when getting a profile with a token" do
    token = JwtHelper.encode({ user_id: @user.id })

    get '/api/me', headers: { authorization: "Bearer #{token}" }, as: :json
    assert_response :success

    body = JSON.parse(response.body)
    assert_equal body['id'], @user.id
  end

  test "should return unauthorized when getting a profile without a token" do
    get '/api/me', as: :json
    assert_response :unauthorized
  end
end
