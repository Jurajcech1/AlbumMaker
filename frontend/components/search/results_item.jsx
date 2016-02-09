var React = require('react');
var ApiUtil = require('../../util/api_util.js');
var History = require('react-router').History;


var ResultsItem = React.createClass({
  mixins: [History],

  // getInitialState: function() {
  //   return { photo: this.props.photo };
  // },
  //
  // componentWillReceiveProps: function(props) {
  //   this.setState({ photo: props.photo });
  // },

  render: function() {
    var theType = this.props.photo.type;
    var theMediaObject;
    if(theType === "image") {
      var picture = this.props.photo.images.standard_resolution.url;
      theMediaObject = <div><img src={picture}/></div>;
    } else {
      var video = this.props.photo.videos.standard_resolution.url;
      theMediaObject = <div><video src={video} autoPlay loop controls ></video></div>;
    }
    return(
      <li>{theMediaObject}</li>
    );
  }
});

module.exports = ResultsItem;