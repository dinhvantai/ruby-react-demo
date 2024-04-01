class User < ApplicationRecord
  include ActiveModel::SecurePassword

  has_secure_password

  has_many :videos

  validates :password, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  attr_accessor :token

end
