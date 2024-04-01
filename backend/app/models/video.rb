class Video < ApplicationRecord
  belongs_to :user

  validates :full_url, presence: true
  validates :video_id, presence: true
  validates :title, presence: true
  validates :user_id, presence: true

  after_create_commit { broadcast_message }

  private

  def broadcast_message
    ActionCable.server.broadcast("NewVideoChannel", {
      type: 'NewVideoChannel',
      data: { id:, user:, full_url:, video_id:, title:, description: }
    })
  end
end
