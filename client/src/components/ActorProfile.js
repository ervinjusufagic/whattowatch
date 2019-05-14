import React, { Component } from "react";
import { Close } from "@material-ui/icons";

import { connect } from "react-redux";
import { toggleModal } from "../actions/listActions";
class ActorProfile extends Component {
  componentWillMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <Close
          style={{ fontSize: "3rem", position: "absolute", top: 0, right: 0 }}
          onClick={() => this.props.toggleModal(!this.props.modalOpen)}
        />

        <span>{this.props.actorId}</span>
      </div>
    );
  }
}
const mapDispatchToProps = {
  toggleModal
};

const mapStateToProps = state => ({
  modalOpen: state.modalOpen
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActorProfile);
