var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Navbar = require('./components/navbar/navbar.jsx');
var SearchForm = require('./components/search/search.jsx');
var SearchResults  = require('./components/search/results.jsx');
var Albums = require('./components/albums/albums.jsx');
var AlbumShow = require('./components/photos/photos_index.jsx');
var PhotoShow = require('./components/photos/photo_show.jsx');

var App = React.createClass({
  render: function () {
    return(
      <div>
        <Navbar/>
        {this.props.children}
      </div>
    );
  }
});

var Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={SearchForm}/>
    <Route path="results" component={SearchResults}/>
    <Route path="index" component={Albums}/>
    <Route path="albums/:albumId" component={AlbumShow}/>
    <Route path="photos/:photoId" component={PhotoShow}/>
  </Route>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Router>{Routes}</Router>, document.getElementById('content'));
});
