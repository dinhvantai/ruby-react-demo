require "test_helper"

class VideoTest < ActiveSupport::TestCase
  def setup
    @video = videos(:one)
    @user = users(:one)
  end

  test "should not save a video without a title" do
    video = Video.new
    video.full_url = @video.full_url
    video.video_id = @video.video_id
    video.user = @user

    assert_not video.save
  end

  test "should not save a video without a url" do
    video = Video.new

    video.title = @video.title
    video.video_id = @video.video_id
    video.user = @user

    assert_not video.save
  end

  test "should not save a video without a user" do
    video = Video.new

    video.title = @video.title
    video.full_url = @video.full_url
    video.video_id = @video.video_id

    assert_not video.save
  end

  test "should save and stream a video with the correct params" do
    video = Video.new

    video.title = Faker::Movie.title
    video.full_url = @video.full_url
    video.video_id = @video.video_id
    video.user = @user

    assert video.save
  end
end
