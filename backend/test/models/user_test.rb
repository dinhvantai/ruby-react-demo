require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should not save a user without a email" do
    user = User.new
    user.password = "password"

    assert_not user.save
  end

  test "should not save a user without a wrong email" do
    user = User.new
    user.email = "wrong_email"

    assert_not user.save
  end

  test "should not save a user without a password" do
    user = User.new
    user.email = Faker::Internet.email

    assert_not user.save
  end

  test "should save user with the correct params" do
    user = User.new
    user.email = Faker::Internet.email
    user.password = 'password'

    assert user.save
  end

  test "should save a user without saving the password" do
    user = User.new
    user.email = Faker::Internet.email
    user.password = 'password'
    assert user.save

    new_user = User.find(user.id)

    assert_nil new_user.password
    assert_not_nil new_user.password_digest
  end

  test "should authenticate the user with the correct password" do
    user = User.new
    user.email = Faker::Internet.email
    user.password = 'password'
    assert user.save

    assert user.authenticate(user.password)
  end

  test "should be unauthenticated with the wrong password" do
    user = User.new
    user.email = Faker::Internet.email
    user.password = 'password'
    assert user.save

    assert_not user.authenticate('wrong_password')
  end
end
