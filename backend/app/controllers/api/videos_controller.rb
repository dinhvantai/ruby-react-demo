class Api::VideosController < ApplicationController
  skip_before_action :authorized, only: [:index]

  # GET /videos
  def index
    @videos = Video.includes(:user).order('id DESC').all
    # @videos = Video.eager_load(:user).all

    render json: @videos, each_serializer: VideoSerializer
  end

  # POST /videos
  def create
    params[:video][:user_id] = current_user.id
    @video = Video.new(video_params)

    if @video.save
      render json: @video, status: :created
    else
      render json: @video.errors, status: :unprocessable_entity
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def video_params
    params.require(:video).permit(:full_url, :video_id, :title, :description, :user_id)
  end
end
