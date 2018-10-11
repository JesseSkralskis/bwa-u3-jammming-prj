let usersAccessToken = '';
const clientId = 'ca47d370807d46718c513653fa4b3d2e';
const UriRedirect = 'http://myShizzzle.surge.sh';
// 'http://localhost:3000/';


const Spotify = {


        getAccessToken: function () {


            if (usersAccessToken.length > 0) {
                console.log('step 1');


                return usersAccessToken;


            } else if (window.location.href.match(/access_token=([^&]*)/) !== null && window.location.href.match(/expires_in=([^&]*)/) !== null) {

                console.log('step 2');
                usersAccessToken = window.location.href.match(/access_token=([^&]*)/)[1];

                let expirationTime = window.location.href.match(/expires_in=([^&]*)/)[1];

                window.setTimeout(() => usersAccessToken = '', expirationTime * 1000);
                window.history.pushState(usersAccessToken, null, '/');
                return usersAccessToken;


            } else {
                console.log('step 3');
                window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${UriRedirect}`;


            }

        },
        search
            (term) {


            if (usersAccessToken.length > 0) {
                console.log('the fetch is being called');
                let token = usersAccessToken;


                return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                }).then(response => {
                    let jsonResponse = response.json();

                    return jsonResponse;

                }).then(jsonResponse => {


                    if (jsonResponse.tracks.items) {

                        return jsonResponse.tracks.items.map(track => ({
                            ID: track.id,
                            Name: track.name,
                            Artist: track.artists[0].name,
                            Album: track.album.name,
                            URI: track.uri

                        }))
                    } else {
                        alert('this search returned no results');
                    }

                });
            } else {
                alert('you aint got no token');


            }

        },


        savePlaylist(uriArray, plName) {

            console.log('this is whats coming into uriArray' + uriArray);
            console.log('this is the name' + plName);
            let token = usersAccessToken;
            let userId = 'not changing';


            if (uriArray && plName) {


                fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`

                    }

                }).then(response => response.json()
                ).then(jsonResponse => {

                    userId = jsonResponse.id;
                    console.log(userId);


                    fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'

                        },
                        method: 'POST',

                        body: JSON.stringify({name: plName}),

                    }).then(response => {
                        return response.json();


                    }).then(jsonResponse => {

                        console.log(jsonResponse);
                        let plId = jsonResponse.id;
                        console.log(plId);

                        fetch(`https://api.spotify.com/v1/playlists/${plId}/tracks`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json'

                            },
                            method: 'POST',

                            body: JSON.stringify({uris: uriArray}),

                        }).then(response => {
                            return response.json();


                        }).then(jsonResponse => {

                            console.log(jsonResponse);
                            let plId2 = jsonResponse.snapshot_id;
                            console.log(plId2);


                        })


                    })


                });


            } else {
                alert('no play list or playlist has no name');
            }


        },
        getPreviewUrl(trackId) {
            return fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                headers: {
                    Authorization: `Bearer ${usersAccessToken}`
                }
            }).then(response => {
                return response.json()
            }).then(jsonResponse => {
                console.log(jsonResponse);
                return ({
                    URL: jsonResponse.preview_url,
                    Id: jsonResponse.id
                })
            })


        }


    }
;


export default Spotify;