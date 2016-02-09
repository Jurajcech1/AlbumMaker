class FixPhotoTypeName < ActiveRecord::Migration
  def change
    rename_column :photos, :type, :vid_or_pic
  end
end
