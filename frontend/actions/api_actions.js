var AppDispatcher = require('../dispatcher/dispatcher.js');
var SearchConstants = require('../constants/search_constants.js');
var AlbumConstants = require('../constants/album_constants.js');
var PhotoConstants = require('../constants/photo_constants.js');

ApiActions = {

  receiveSearchResults: function (result, start, end, tag) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RESULT_RECEIVED,
      result: {result: result, start: start, end: end, tag: tag}
    });
  },

  receiveNewAlbum: function (albums) {
    AppDispatcher.dispatch({
      actionType: AlbumConstants.NEW_ALBUM_RECEIVED,
      albums: albums
    });
  },

  receiveNewPhoto: function (photo) {
    AppDispatcher.dispatch({
      actionType: PhotoConstants.NEW_PHOTO_RECEIVED,
      photo: photo
    });
  },

  receiveAlbumPictures: function (pictures) {
    AppDispatcher.dispatch({
      actionType: PhotoConstants.ALL_PHOTOS_RECEIVED,
      pictures: pictures
    });
  },

  receiveSinglePhoto: function (photo) {
    AppDispatcher.dispatch({
      actionType: PhotoConstants.RECEIVE_SINGLE_PHOTO,
      photo: photo
    });
  }

};

module.exports = ApiActions;
