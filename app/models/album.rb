class Album < ActiveRecord::Base

  has_many :photos,
  primary_key: :id,
  foreign_key: :album_id,
  class_name: "Photo"

  def self.current_user_albums(id)
    self.where("user_id = ?", id)
  end

end
