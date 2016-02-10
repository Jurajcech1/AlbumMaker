var React = require('react');
var ApiUtil = require('../../util/api_util.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var SearchStore = require('../../stores/search.js');
var History = require('react-router').History;

var SearchForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function() {
   return {
     tag: "",
     startDate: "",
     endDate: ""
   };
 },

  handleSubmit: function(e) {
    e.preventDefault();

    var tag = this.state.tag;
    var start = this.state.startDate;
    var end = this.state.endDate;

    ApiUtil.getSearchResults(tag, start, end);
    this.redirectToResults();
  },

  redirectToResults: function() {
    this.history.pushState(null, "results");
  },

  render: function() {
    return(
      <div className="search_form clearfix">
        <form  onSubmit={this.handleSubmit}>
          <div className="Search_form_header">Search For a Tag</div>
          <textarea className="Search_form_input" type="text" placeholder="tag" valueLink={this.linkState('tag')}></textarea>
          <br/>
          <div className="date_label">start date</div>
          <input className="start_date" type="date" valueLink={this.linkState('startDate')}/>
          <br/>
          <div className="end_label">end date</div>
          <input className="end_date" type="date" valueLink={this.linkState('endDate')}/>
          <br/>
          <input className="Search_form_submit" type="submit" value="Search tag" />
        </form>
      </div>
    );
  }
});
module.exports = SearchForm;
