class Photo < ActiveRecord::Base

  belongs_to :album,
  primary_key: :id,
  foreign_key: :album_id,
  class_name: "Album"
  
end
