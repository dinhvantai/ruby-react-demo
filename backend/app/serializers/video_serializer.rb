class VideoSerializer < ActiveModel::Serializer
  attributes :id, :full_url, :video_id, :title,
             :user_id, :description, :user,
             :created_at, :updated_at
end
