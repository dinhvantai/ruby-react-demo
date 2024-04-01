class Video < ApplicationRecord
  belongs_to :user

  validates :full_url, presence: true
  validates :video_id, presence: true
  validates :title, presence: true
  validates :user_id, presence: true
end
