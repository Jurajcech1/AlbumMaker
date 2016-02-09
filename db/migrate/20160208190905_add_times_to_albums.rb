class AddTimesToAlbums < ActiveRecord::Migration
  def change
    add_column :albums, :start, :string
    add_column :albums, :finish, :string
  end
end
