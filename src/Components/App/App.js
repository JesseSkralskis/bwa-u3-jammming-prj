import React from 'react';

import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';
import bg2 from './background_photo_desktop.jpg';




class App extends React.Component {

    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.searchSpotify = this.searchSpotify.bind(this);
        this.clickSearch=this.clickSearch.bind(this);




        this.state = {



            backgroundImage: '',

            playlistName: '',

            searchResults:
                [],


            playlistTracks:
                [],


        };

    }

    getToken() {
        Spotify.getAccessToken();


    }

    clickSearch = (url) => {
        this.setState({
            backgroundImage: url

        })
    };

    searchSpotify(term) {
        if (Spotify.search(term)) {
            Spotify.search(term).then(searchResults => {
                console.log('searchSpotify called');
                this.setState({searchResults: searchResults})
            })
        } else {
            console.log('nothing in it')
        }
    }

    addTrack(track) {

        console.log(track);
        let currentPlaylist = this.state.playlistTracks;
        console.log(this.state.playlistTracks);
        if (currentPlaylist.find(savedTrack => savedTrack.ID === track.ID)) {
            alert('This track is already in your playlist');

        } else {
            console.log('');

            let array = currentPlaylist.concat(track);

            this.setState({playlistTracks: array});
            console.log(currentPlaylist);

        }
    }

    removeTrack(track) {

        for (let i = 0; i < this.state.playlistTracks.length; i++) {
            if (this.state.playlistTracks[i].ID === track.ID) {
              let removed= this.state.playlistTracks.splice(i, 1);
              console.log('removed =' + removed.Name);

              this.setState({playlistTracks: this.state.playlistTracks});
              console.log(this.state.playlistTracks);

            }
        }


    }

    updatePlaylistName(name) {
        this.setState({playlistName: name});

    }







    savePlaylist(name) {
        let trackUrIs = [];



        console.log(name);
        let playlist =this.state.playlistTracks;

        playlist.forEach(track =>{
            trackUrIs.push(track.URI);

        });
        console.log( "passed in name"+ name);
        console.log(trackUrIs);

        Spotify.savePlaylist(trackUrIs,name);


        console.log('whats happening here?' + this.state.playlistName);
        this.setState({playlistTracks: []});







    }


    render() {


        return (
            <div onLoad={this.getToken()}>
                <h1>MY SHI<span className="highlight">ZZZZZ</span>LE</h1>
                <div style={{backgroundImage:this.state.backgroundImage}} className="App">

                    <div className="App-playlist">
                        <SearchBar image={bg2} searchClicked={this.clickSearch}  onSearch={this.searchSpotify}/>
                        <SearchResults isRemoval={false}  onAdd={this.addTrack}
                                       searchResults={this.state.searchResults}/>
                        <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName}
                                  playlistName={this.state.playlistName}
                                  onRemove={this.removeTrack}
                                  isRemoval={true}
                                  ref={this.child}

                                  playlistTracks={this.state.playlistTracks}/>


                    </div>
                </div>
            </div>
        );
    }
}

export default App;
