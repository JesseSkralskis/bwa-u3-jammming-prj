import React from 'react';
import Track from '../Track/Track.js';
import './TrackList.css';

class TrackList extends React.Component {


    render() {


            return (<div className="TrackList">


                    {

                        this.props.tracks.map(track => {
                            return <Track key={track.ID} track={track} isRemoval={this.props.isRemoval} onNameChange={this.props.OnNameChange} onRemove={this.props.onRemove} onAdd={this.props.onAdd}/>
                        })
                    }
                </div>)

    }

}

export default TrackList;
