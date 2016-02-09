var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var PhotoStore = new Store(AppDispatcher);
var PhotoConstants =require('../constants/photo_constants.js');

var _photos = [];
var _album = {};

var addPhoto = function(photo) {
  _photos.push(photo);

};

var resetPhotos = function(pictures) {
  _photos = pictures.photos.slice();
  _album = pictures;
};

var setSinglePhoto = function(photo) {
  _photos = [photo];
};

PhotoStore.find = function(id) {
  var thePhoto;
  _photos.forEach(function(photo) {
    if (photo.id === id) {
      thePhoto = photo;
    }
  });
  return thePhoto;
}

PhotoStore.all = function() {

  return _photos.slice();
};

PhotoStore.getAlbum = function() {
  return _album;
};

PhotoStore.__onDispatch = function(payload) {
  switch(payload.actionType) {
    case PhotoConstants.NEW_PHOTO_RECEIVED:
      addPhoto(payload.photo);
      PhotoStore.__emitChange();
      break;
    case PhotoConstants.ALL_PHOTOS_RECEIVED:
      resetPhotos(payload.pictures);
      PhotoStore.__emitChange();
      break;
    case PhotoConstants.RECEIVE_SINGLE_PHOTO:
      setSinglePhoto(payload.photo);
      PhotoStore.__emitChange();
      break;
  }
};

module.exports = PhotoStore;
