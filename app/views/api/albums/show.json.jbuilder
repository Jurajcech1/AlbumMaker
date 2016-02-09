json.extract! @album, :id, :tag, :user_id, :start, :finish
json.photos @album.photos do |photo|
  json.extract! photo, :id, :album_id, :creator, :vid_or_pic, :native_link, :photo_url, :thumbnail, :tag_time
end
