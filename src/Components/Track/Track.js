import React from 'react';
import './Track.css';
import Spotify from '../../util/Spotify.js';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.getURLSetState = this.getURLSetState.bind(this);
        this.state = {
            previewResults: []
        }


    }


    renderAction() {


        if (this.props.isRemoval) {
            return <p onClick={this.removeTrack}> - </p>
        } else {
            return <p onClick={this.addTrack}> + </p>
        }
    }

    addTrack() {
        console.log('add track from track called passing in the track named' + this.props.track.Name);
        this.props.onAdd(this.props.track);


    }

    removeTrack() {
        console.log('remove track from track called passing in the track named' + this.props.track.Name);
        this.props.onRemove(this.props.track)
    }
    //
    shouldComponentUpdate() {
        if (this.state.previewResults.URL) {
            return false; // Will cause component to never re-render.
        }else{
            return true;
        }
    }

    getURLSetState(id) {


        Spotify.getPreviewUrl(id).then(results => {
            console.log(results);
                this.setState({previewResults: results})
            }
        )


    }


    render() {


        return (
            <div className="Track">
                <div  className="Track-information">
                    <h3>{this.props.track.Name}</h3>
                    <p>{this.props.track.Artist} | {this.props.track.Album}</p>
                    <a onClick={this.getURLSetState(this.props.track.ID)} href={this.state.previewResults.URL} target={'_blank'}>Track Preview</a>

                </div>
                <a className="Track-action">{this.renderAction()}</a>

            </div>
        )
    }
}

export default Track;
