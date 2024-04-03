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
      Video.create(@video)
    end
  end
end
