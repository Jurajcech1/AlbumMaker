var React = require('react');
var ApiUtil = require('../../util/api_util.js');
var History = require('react-router').History;

var PhotoItem = React.createClass({
  mixins: [History],

  showThisPhoto: function() {
    this.history.pushState(null, "photos/" + this.props.photo.id);
  },

  render: function() {
    var thumb = this.props.photo.thumbnail;
    return(
      <li onClick={this.showThisPhoto}>
        <img src={thumb}/>
      </li>
    );
  }
});

module.exports = PhotoItem;
