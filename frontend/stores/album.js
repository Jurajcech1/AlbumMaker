var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var AlbumStore = new Store(AppDispatcher);
var AlbumConstants =require('../constants/album_constants.js');

var _albums = [];

var resetAlbums = function(albums) {
  _albums = albums.slice();
};

AlbumStore.all = function() {
  return _albums.slice();
};

AlbumStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case AlbumConstants.NEW_ALBUM_RECEIVED:
      resetAlbums(payload.albums);
      AlbumStore.__emitChange();
      break;
  }
};

module.exports = AlbumStore;
