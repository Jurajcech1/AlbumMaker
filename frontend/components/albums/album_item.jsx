var React = require('react');
var ApiUtil = require('../../util/api_util.js');
var History = require('react-router').History;

var AlbumItem = React.createClass({
  mixins: [History],

  showThisAlbum: function() {
    this.history.pushState(null, "albums/" + this.props.album.id);
  },

  render: function() {
    var tag = this.props.album.tag;
    var start = this.props.album.start;
    var finish = this.props.album.finish;
    return(
      <li className="album_index_item" onClick={this.showThisAlbum}>
        <div>{tag}</div>
        <div>{start} - {finish}</div>
      </li>
    );
  }
});

module.exports = AlbumItem;
