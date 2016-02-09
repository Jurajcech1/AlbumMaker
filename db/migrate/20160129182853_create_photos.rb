class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.integer :album_id, null: false
      t.string :creator, null: false
      t.string :type, null: false
      t.string :native_link, null: false
      t.string :photo_url, null: false
      t.timestamps null: false
    end
    add_index :photos, :album_id
  end
end
