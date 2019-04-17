import React, { Component } from "react";
import MyListItem from "./MyListItem";

import "../css/myList.css";

import Modal from "@material-ui/core/Modal";
import MovieModal from "./MovieModal";

import { connect } from "react-redux";
import { toggleModal } from "../actions/listActions";

class Watched extends Component {
  constructor(props) {
    super();

    this.renderWatchedList.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
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
        <Modal open={this.props.modalOpen} onClose={this.handleClose}>
          <MovieModal movie={this.props.modalMovie} />
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
