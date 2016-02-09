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
      return(
        <div>
          <ul>
            {pictures}
          </ul>
        </div>
      );
    }
  }

});

module.exports = Photos;
