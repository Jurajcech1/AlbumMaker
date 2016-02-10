var React = require('react');
var ApiUtil = require('../../util/api_util.js');
var PhotoStore = require('../../stores/photo.js');
var PhotoItem = require('./photos_index_item.jsx');

var Photos = React.createClass({

  getStateFromStore: function() {
    return {photos: PhotoStore.all(),
            album: PhotoStore.getAlbum()};
  },

  getInitialState: function() {
    return this.getStateFromStore();
  },

  _onChange: function() {
    this.setState(this.getStateFromStore());
  },

  componentWillMount: function() {
    this.photoListener = PhotoStore.addListener(this._onChange);
    ApiUtil.fetchAlbumPhotos(parseInt(this.props.params.albumId));
  },

  // componentWillReceiveProps: function(props) {
  //   ApiUtil.fetchAlbumPhotos(parseInt(props.params.albumId));
  // },

  componentWillUnmount: function() {
    this.photoListener.remove();
  },

  render: function() {
    var pictures = this.state.photos.map(function(photo) {
      return <PhotoItem key={photo.id} photo={photo}/>;
    });
    if (pictures === []) {
      return(<div></div>);
    } else {
      var albumTag = this.state.album.tag;
      var beginning = this.state.album.start;
      var finish = this.state.album.finish;
      return(
        <div>
          <div className="index_header_container">
            <div className="photo_index_header">#{albumTag}</div>
            <div className="photo_index_range">{beginning} - {finish}</div>
          </div>
          <ul className="photo_index_ul">
            {pictures}
          </ul>
        </div>
      );
    }
  }

});

module.exports = Photos;
