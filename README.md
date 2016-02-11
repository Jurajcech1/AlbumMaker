# AlbumMaker

[Live][link]
[link]: https://albummaker.herokuapp.com

AlbumMaker is a web application that uses the Instagram API to retrieve posts
with a given tag and takes only the tagged content within a time range supplied
by the user.  AlbumMaker is built with Ruby on Rails and ReactJS with a Flux
architecture.

## Features
### Searching
- Users can create an account or sign in as a guest and are prompted to search
  for content by inputting a tag (without the "#"), start date, and end date to
  search by.
- Start date should always be the earlier date and End date the latter.  For
  example, if searching for content between February 2 and February 4, Start
  date is the former and End date the latter.
- To see immediate results, set End date to one day ahead of the current date.
  This is due to the need of the Instagram API to paginate through results.

### Collections
- Users view the results and can hit "load more" to view further results.
- Clicking "create album" creates an album composed of all of the content that
  was being displayed at the moment when "create album" was clicked.
- This album is stored and can be viewed at any point.
- Both videos and photos can be viewed and the original Instagram user who
  created the content as well as a link to the native Instagram site is
  displayed.

## To Do
### Features
- [ ] Deleting albums or individual photos or videos.
- [ ] Selecting specifically which photos or videos to add to an album.

### Performance
- [ ] Optimizing the search filter to more quickly get the Instagram API to a
      date range whose End date is several weeks or months before the present.
