var React = require('react');
var ApiUtil = require('../../util/api_util.js');
var PhotoStore = require('../../stores/photo.js');

var PhotoShow = React.createClass({

  getStateFromStore: function() {
    return {photo: PhotoStore.find(parseInt(this.props.params.photoId))};
  },

  getInitialState: function() {
    return this.getStateFromStore();
  },

  _onChange: function() {
    this.setState(this.getStateFromStore());
  },

  componentWillMount: function() {
    this.photoShowUpdater = PhotoStore.addListener(this._onChange);
    ApiUtil.fetchSinglePhoto(parseInt(this.props.params.photoId));
  },

  componentWillReceiveProps: function(props) {
    this.setState({photo: PhotoStore.find(parseInt(props.params.photoId))});
  },

  componentWillUnmount: function() {
    this.photoShowUpdater.remove();
  },

  openNativeLink: function() {
    var link = this.state.photo.native_link;
    window.open(link);
  },

  render: function() {
    var photo = this.state.photo;
    var mediaObject;
    if (photo) {
      if (photo.vid_or_pic === "video") {
        mediaObject = <video className="media_object" src={photo.photo_url} autoPlay loop controls></video>;
      } else {
        mediaObject = <img className="media_object" src={photo.photo_url}/>;
      }
      return(
        <div className="photo_show_div">
          <div className="photo_creator">User: {photo.creator}</div>
          <div className="native_link" onClick={this.openNativeLink}>Open in Instagram</div>
          {mediaObject}
        </div>
      );
    } else {
      return(<div></div>)
    }
  }

});

module.exports = PhotoShow;
