require "test_helper"

class VideoChannelTest < ActionCable::Channel::TestCase
  def setup
    @video = videos(:one)
  end

  test "should stream for NewVideoChannel when broadcasting" do
    assert_broadcasts "NewVideoChannel", 1 do
      ActionCable.server.broadcast("NewVideoChannel", {
        type: 'NewVideoChannel',
        data: @video
      })
    end
  end

  test "should stream for NewVideoChannel when create a video" do
    assert_broadcasts "NewVideoChannel", 1 do
       Video.create(title: @video.title, full_url: @video.full_url, video_id: @video.video_id, user_id: users(:one).id)
    end
  end
end
