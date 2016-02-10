var ApiActions = require('../actions/api_actions.js')

var ApiUtil = {
  endSession: function() {
    $.ajax({
      url: "/session",
      method: 'DELETE',
      success: function (result) {
        window.location.href = "/session/new";
      }
    });
  },

  getSearchResults: function(tag, start, end) {
    $.ajax({
      url: "https://api.instagram.com/v1/tags/" + tag + "/media/recent?access_token=" + INSTAGRAM_API_KEY + "&count=1000",
      dataType: 'jsonp',
      success: function (result) {
        ApiActions.receiveSearchResults(result, start, end, tag);
      }
    });
  },

  getMoreResults: function(url, start, end, tag) {
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function (result) {
        ApiActions.receiveSearchResults(result, start, end, tag);
      }
    });
  },

  createNewPhotos: function(pictures, albums) {
    var newestAlbum = albums[albums.length - 1];
    pictures.forEach(function(picture) {
      var mainUrl;
      if(picture.type === "video") {
        mainUrl = picture.videos.standard_resolution.url;
      } else {
        mainUrl = picture.images.standard_resolution.url;
      }
      $.ajax({
        url: "api/photos",
        method: 'POST',
        data: {photo: {
               album_id: newestAlbum.id,
               creator: picture.user.username,
               vid_or_pic: picture.type,
               native_link: picture.link,
               photo_url: mainUrl,
               thumbnail: picture.images.low_resolution.url,
               tag_time: picture.created_time}
             },
        success: function (newPhoto) {
          ApiActions.receiveNewPhoto(newPhoto);
        }
      });
    });
  },

  createNewAlbum: function(pictures, tag, start, end) {
    var that = this;
    $.ajax({
      url: "api/albums",
      method: 'POST',
      data: {album: {tag: tag, start: start, finish: end}},
      success: function (albums) {
        ApiActions.receiveNewAlbum(albums);
        that.createNewPhotos(pictures, albums);
      }
    });
  },

  fetchAllAlbums: function() {
    $.ajax({
      url: "api/albums",
      success: function (albums) {
        ApiActions.receiveNewAlbum(albums);
      }
    });
  },

  fetchAlbumPhotos: function(id) {
    $.ajax({
      url: "api/albums/" + id,
      success: function(pictures) {
        ApiActions.receiveAlbumPictures(pictures);
      }
    });
  },

  fetchSinglePhoto: function(id) {
    $.ajax({
      url: "api/photos/" + id,
      success: function(photo) {
        ApiActions.receiveSinglePhoto(photo);
      }
    });
  }
};

module.exports = ApiUtil;
