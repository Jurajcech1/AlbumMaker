var React = require('react')
var ApiUtil = require('../../util/api_util.js');
var History = require('react-router').History;
var SearchStore = require('../../stores/search.js');

var Navbar = React.createClass({
  mixins: [History],

  logoutUser: function(e) {
    e.preventDefault;
    ApiUtil.endSession();
  },

  toSearch: function(e) {
    e.preventDefault;
    SearchStore.clearResult();
    this.history.pushState(null, "/");
  },

  toProfile: function(e) {
    e.preventDefault;
    this.history.pushState(null, "users/" + window.current_userid);
  },

  toAlbums: function(e) {
    e.preventDefault;
    this.history.pushState(null, "index");
  },

  render: function() {
    return(
      <div className="bar">
      <ul className="navbar-ul">
        <li className="icon icon-1"><button className="navbar_buttons" onClick={this.toSearch}>Search</button></li>
        <li className="icon icon-3"><button className="navbar_buttons" onClick={this.toAlbums}>My Albums</button></li>
        <li className="con_name">
          Welcome {window.current_username}
        </li>
        <li className="con_site"><h1>AlbumMaker</h1></li>
        <li className="logout"><button className="navbar_buttons" onClick={this.logoutUser}>Logout</button></li>
      </ul>
      </div>
    );
  }
});

module.exports = Navbar;
