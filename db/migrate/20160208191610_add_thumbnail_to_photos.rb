class AddThumbnailToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :thumbnail, :string
    add_column :photos, :tag_time, :string
  end
end
