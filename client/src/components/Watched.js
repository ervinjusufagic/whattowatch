import React, { Component } from "react";

import Modal from "@material-ui/core/Modal";

import MyListItem from "./MyListItem";
import WatchedDetailed from "./WatchedDetailed";

import { connect } from "react-redux";
import { toggleModal } from "../actions/listActions";

import "../css/myList.css";

class Watched extends Component {
  constructor(props) {
    super();

    this.renderWatchedList.bind(this);
  }

  renderWatchedList() {
    return this.props.watched.map(movie => {
      return (
        <div
          onClick={() => this.props.toggleModal(!this.props.modalOpen, movie)}
          key={movie.id}
          className="listItem"
        >
          <MyListItem movie={movie} />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="list">
        {this.renderWatchedList()}
        <Modal
          style={{ backgroundColor: "#dedede", overflow: "scroll" }}
          open={this.props.modalOpen}
          onClose={this.handleClose}
        >
          <WatchedDetailed movie={this.props.modalMovie} />
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = {
  toggleModal
};

const mapStateToProps = state => ({
  watched: state.watched,
  modalOpen: state.modalOpen,
  modalMovie: state.modalMovie
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Watched);
