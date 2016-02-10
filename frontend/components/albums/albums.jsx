var React = require('react');
var ApiUtil = require('../../util/api_util.js');
var AlbumStore = require('../../stores/album.js');
var AlbumItem = require('./album_item.jsx');

var Albums = React.createClass({

  getInitialState: function() {
    return { albums: AlbumStore.all() };
  },

  _updateAlbums: function() {
    this.setState({ albums: AlbumStore.all() });
  },

  componentDidMount: function() {
    this.albumUpdater = AlbumStore.addListener(this._updateAlbums);
    ApiUtil.fetchAllAlbums();
  },

  componentWillUnmount: function() {
    this.albumUpdater.remove();
  },

  render: function() {
    var albums = this.state.albums.map(function(album) {
      return <AlbumItem key={album.id} album={album}/>;
    });
    if (albums === []) {
      return(<div></div>);
    } else {
      return(
        <div>
          <ul className="album_index_ul">
            {albums}
          </ul>
        </div>
      );
    }
  }

});

module.exports = Albums;
