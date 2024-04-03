require "test_helper"

class Api::VideosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @video = videos(:one)
    @user = User.create({ email: Faker::Internet.email, password: 'password' })
  end

  test "should return all videos" do
    get '/api/videos', as: :json
    assert_response :success

    videos = JSON.parse(response.body)
    assert_equal Video.count, videos.length
  end

  test "should create a video" do
    token = JwtHelper.encode({ user_id: @user.id })

    assert_difference("Video.count") do
      post '/api/videos', params: { video: @video }, headers: { authorization: "Bearer #{token}" }, as: :json
    end

    assert_response :created
  end

  test "should return unauthorized when creating without a token" do
    assert_no_difference("Video.count") do
      post '/api/videos', params: { video: @video }, as: :json
    end

    assert_response :unauthorized
  end

  test "should return an error when creating empty video" do
    token = JwtHelper.encode({ user_id: @user.id })

    assert_no_difference("Video.count") do
      post '/api/videos', params: { video: {} }, headers: { authorization: "Bearer #{token}" }, as: :json
    end

    assert_response :unprocessable_entity
  end
end
