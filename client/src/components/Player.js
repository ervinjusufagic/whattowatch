import React, { Component } from "react";
import YouTube from "react-youtube";

import { connect } from "react-redux";
import { toggleTrailer } from "../actions/movieActions";

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
