import React, { Component } from "react";
import YouTube from "react-youtube";

import { connect } from "react-redux";
import { toggleTrailer } from "../actions/movieActions";

import "../css/Deck.css";

class Player extends Component {
  constructor(props) {
    super();
  }

  fetchTrailer() {
    let videos = this.props.videos;
    let trailerKey = [];
    const trailers = [];
    if (videos.length > 1) {
      videos.forEach(video => {
        if (video.type === "Trailer") {
          trailers.push(video.key);
        }
      });
    }

    if (trailers.length > 0) {
      trailerKey = trailers[0];
    } else {
      trailerKey = this.props.videos[0].key;
    }

    return trailerKey;
  }

  render() {
    const opts = {
      playerVars: {
        autoplay: 1
      }
    };

    const trailerKey = this.fetchTrailer();
    return (
      <div>
        <YouTube
          containerClassName="playerContainer"
          className="player"
          videoId={trailerKey}
          opts={opts}
          onReady={this._onReady}
          onEnd={this._onEnd}
        />
      </div>
    );
  }
  _onEnd(event) {
    event.target.stopVideo();
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.playVideo();
  }
}

const mapDispatchToProps = {
  toggleTrailer
};

const mapStateToProps = state => ({
  trailerOpen: state.trailerOpen
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
