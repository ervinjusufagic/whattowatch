import React, { Component } from "react";
import MyListItem from "./MyListItem";

import "../css/myList.css";

import Modal from "@material-ui/core/Modal";
import MovieModal from "./MovieModal";

import { connect } from "react-redux";
import { toggleModal } from "../actions/listActions";

class Unwatched extends Component {
  constructor(props) {
    super();

    this.renderUnwatchedList.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  renderUnwatchedList() {
    return this.props.unwatched.map(movie => {
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
        {this.renderUnwatchedList()}
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
  modalOpen: state.modalOpen,
  unwatched: state.unwatched,
  modalMovie: state.modalMovie
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Unwatched);
