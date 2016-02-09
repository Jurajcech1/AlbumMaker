class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :tag, null: false
      t.integer :user_id, null: false
      t.timestamps null: false
    end
    add_index :albums, :user_id
  end
end
