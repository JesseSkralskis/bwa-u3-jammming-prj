import React from 'react';
import TrackList from '../TrackList/TrackList.js';

class SearchResults extends React.Component {

    render() {

        return (
            <div className="SearchResults">
                <h2>Results</h2>

                <TrackList isRemoval={this.props.isRemoval} onAdd={this.props.onAdd}
                           tracks={this.props.searchResults}/>

            </div>
        )
    }

}

export default SearchResults;
