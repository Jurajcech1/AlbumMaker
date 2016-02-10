var React = require('react');
var ApiUtil = require('../../util/api_util.js');
var SearchStore = require('../../stores/search.js');
var ResultsItem = require('./results_item.jsx');
var History = require('react-router').History;

var Results = React.createClass({
  mixins: [History],

  getInitialState: function() {
    var searchInfo = SearchStore.getTag();
    return { pictures: SearchStore.all(),
             tag: searchInfo.tag,
             start: searchInfo.start,
             end: searchInfo.end
           };
  },

  _paginatePhotos: function() {
    var searchInfo = SearchStore.getTag();
    this.setState({ pictures: SearchStore.all(),
                    tag: searchInfo.tag,
                    start: searchInfo.start,
                    end: searchInfo.end
                  });
  },

  paginate: function(e) {
    e.preventDefault;
    SearchStore.increaseIndex();
    this._paginatePhotos();
  },

  createAlbum: function(e) {
    e.preventDefault;
    ApiUtil.createNewAlbum(this.state.pictures, this.state.tag, this.state.start, this.state.end);
    this.history.pushState(null, "index");
  },

  componentDidMount: function() {
    this.photoUpdater = SearchStore.addListener(this._paginatePhotos);
  },

  componentWillUnmount: function() {
    this.photoUpdater.remove();
  },

  render: function() {

    var photos = this.state.pictures.map(function(photo) {
      return <ResultsItem key={photo.id} photo={photo}/>;
    });
    if (photos === []) {
      return(<div></div>);
    } else {
      return(
        <div>
          <button className="create_album_button" onClick={this.createAlbum}>create album</button>
          <ul className="search_results_index">
            {photos}
          </ul>
          <button className="load_more_button" onClick={this.paginate}>load more</button>
        </div>
      );
    }
  }
});

module.exports = Results;
