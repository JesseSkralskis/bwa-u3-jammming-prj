import React from 'react';
import './Track.css';

class Track extends React.Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack= this.removeTrack.bind(this);
  }

  renderAction(){

    if (this.props.isRemoval){
        return <p onClick={this.removeTrack}> - </p>
    }else{
      return <p onClick={this.addTrack}> + </p>
    }
  }
  addTrack(){
    console.log('add track from track called passing in the track named'+this.props.track.Name);
  this.props.onAdd(this.props.track);


  }

  removeTrack(){
      console.log('remove track from track called passing in the track named'+this.props.track.Name);
    this.props.onRemove(this.props.track)
  }


  render(){

    return(
      <div className="Track">
  <div className="Track-information">
    <h3>{this.props.track.Name}</h3>
    <p>{this.props.track.Artist} | {this.props.track.Album}</p>
  </div>
  <a className="Track-action">{this.renderAction()}</a>
</div>
    )
  }
}

export default Track;
