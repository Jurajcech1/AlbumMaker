var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher.js');
var SearchStore = new Store(AppDispatcher);
var SearchConstants =require('../constants/search_constants.js');
var ApiUtil = require('../util/api_util.js');

var _result = [];
var _index = 19;
var _apiHits = 0;
var _pinging = true;
var _currentTag = "";

var inComments = function(comments, author, tag, begin, finish) {
  comments.forEach(function(comment) {
    var text = comment.text.split(" ");
    var tagIncluded = (text.includes("#" + tag) || text.includes("#" + tag + ","));
    var isAuthor = (author === comment.from.username);
    var commentTime = new Date(parseInt(comment.created_time) * 1000);
    var inTimeRange = (commentTime > begin && commentTime < finish);
    if(tagIncluded && isAuthor && inTimeRange) {
      return true;
    }
  });
  return false;
};

// var timeParser = function(time) {
//   var date = time.split("-").map(function(num) {
//     return parseInt(num);
//   });
//   return Date.UTC(date[0], date[1], date[2]);
// }

var isWithinTagtime = function(post, start, end, tag) {
  if(post.caption !== null) {
    var caption = post.caption.text.split(" ");
    var captionTime = new Date(parseInt(post.caption.created_time) * 1000);
    var begin = new Date(start);
    var finish = new Date(end);
    var withinRange = (begin < captionTime && finish > captionTime);
    if((caption.includes("#" + tag) || caption.includes("#" + tag + ",")) && withinRange) {
      return true;
    }
  } else {
    var begin = new Date(start);
    var finish = new Date(end);
    var comments = post.comments.data;
    var author = post.user.username;
    if (inComments(comments, author, tag, begin, finish)) {
     return true;
    } else {
      return false;
    }
  }

  // if((caption.includes("#" + tag) || caption.includes("#" + tag + ",")) && withinRange) {
  //   return true;
  // } else if (inComments(comments, author, tag, begin, finish)) {
  //  return true;
  // } else {
  //   return false;
  // }
};

var dateFilter = function(result, start, end, tag) {
  _currentTag = {tag: tag, start: start, end: end};
  if(result.data.length > 0) {
    result.data.forEach(function(post) {
      if(isWithinTagtime(post, start, end, tag)) {
        _result.push(post);
      }
    });
    var lastTagTime = new Date(parseInt(result.data.slice(-1)[0].created_time) * 1000);
    var firstTagTime = new Date(parseInt(result.data.slice(0,1)[0].created_time) * 1000);
    var earliest = new Date(start);
    var latest = new Date(end);
    if(lastTagTime > earliest && _apiHits < 1000 && _pinging) {
      _apiHits++
      ApiUtil.getMoreResults(result.pagination.next_url, start, end, tag);
    }
  }
};

var resetResult = function(result) {
  dateFilter(result.result, result.start, result.end, result.tag);
};

SearchStore.increaseIndex = function() {
  _index += 20;
};

SearchStore.getTag = function() {
  return _currentTag;
}

SearchStore.clearResult = function() {
  _result = [];
  _apiHits = 0;
  _index = 19;
  _pinging = false;
  _currentTag = "";
  setTimeout(function(){
    _pinging = true;
    _result = [];
  }, 3000);
};

SearchStore.all = function() {
  if(_result.length < 20) {
    return _result.slice();
  } else {
    return _result.slice(0, _index);
  }
};

SearchStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case SearchConstants.RESULT_RECEIVED:
      resetResult(payload.result);
      SearchStore.__emitChange();
      break;
  }
};

module.exports = SearchStore;
