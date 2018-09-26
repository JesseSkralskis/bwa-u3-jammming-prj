import React from 'react';
import TrackList from '../TrackList/TrackList.js';
import './Playlist.css';
import Track from "../Track/Track";

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.handlePlaylistTermChange=this.handlePlaylistTermChange.bind(this);
        this.onClickList=this.onClickList.bind(this);
        this.state ={playlistName:'new Playlist'}
    }



    save() {



        if (this.state.playlistName === null || this.state.playlistName === "") {

            this.props.onSave('New Playlist') ;

        }else{

            this.props.onSave(this.state.playlistName);
            this.setState({playlistName: 'new playlist'});
        }


    }

    handlePlaylistTermChange(e){


        this.setState({playlistName: e.target.value });




    }

    onClickList(){
        this.props.onNameChange();
        this.save();


    }



    render() {



        return (
            <div className="Playlist">

                <input onChange={this.handlePlaylistTermChange} value={this.state.playlistName}/>
              <TrackList  onNameChange={this.props.onNameChange} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} tracks={this.props.playlistTracks}/>
                <a  onClick={this.onClickList} className="Playlist-save">SAVE TO SPOTIFY</a>

            </div>
        )
    }
}


export default Playlist;
