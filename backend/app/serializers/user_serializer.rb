class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :token, :created_at, :updated_at
end
