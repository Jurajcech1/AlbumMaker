class Api::PhotosController < ApplicationController

  def create
    @photo = Photo.new(photo_params)
    if @photo.save!
      render :show
    end
  end

  def show
    @photo = Photo.find(params[:id])
    render :show
  end

  private

  def photo_params
    params.require(:photo).permit(:album_id, :creator, :vid_or_pic, :native_link, :photo_url, :thumbnail, :tag_time)
  end

end
