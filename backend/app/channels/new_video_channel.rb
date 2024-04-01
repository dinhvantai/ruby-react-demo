class NewVideoChannel < ApplicationCable::Channel
  def subscribed
    stream_from "NewVideoChannel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
