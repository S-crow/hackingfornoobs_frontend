import React from 'react';

class Search extends React.Component {
    render() {
      return (
        <div>
        <input type="search" id="site-search" name="q"
       aria-label="Search through site content"></input>
        </div>
      );
    }
  }

  export default Search;