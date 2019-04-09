import React, { Component } from "react";
import YouTube from "react-youtube";

import "../css/Deck.css";

class Player extends Component {
  constructor(props) {
    super();

    const { trailerKey } = props;

    this.state = {
      trailerKey: trailerKey
    };
  }

  render() {
    const opts = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    };
    return (
      <div>
        <YouTube
          containerClassName="playerContainer"
          className="player"
          videoId={this.state.trailerKey}
          opts={opts}
          onReady={this._onReady}
        />
      </div>
    );
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  }
}

export default Player;
