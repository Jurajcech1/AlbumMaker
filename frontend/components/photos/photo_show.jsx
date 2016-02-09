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

  render: function() {
    var photo = this.state.photo;
    var mediaObject;
    if (photo) {
      if (photo.vid_or_pic === "video") {
        mediaObject = <video src={photo.photo_url} autoPlay loop controls></video>;
      } else {
        mediaObject = <img src={photo.photo_url}/>;
      }
      return(
        <div>
          <div>{photo.creator}</div>
          {mediaObject}
        </div>
      );
    } else {
      return(<div></div>)
    }
  }

});

module.exports = PhotoShow;
