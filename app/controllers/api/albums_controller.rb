class Api::AlbumsController < ApplicationController
  def index
    @albums = Album.current_user_albums(current_user.id).reverse
    render :index
  end

  def show
    @album = Album.find(params[:id])
    render :show
  end

  def create
    @album = Album.new(album_params)
    @album.user_id = current_user.id
    if @album.save!
      @albums = Album.all
      render :index
    end
  end

  private

  def album_params
    params.require(:album).permit(:tag, :start, :finish)
  end

end
