import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
class Rating extends Component {
  state = {
    completed: 0
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 1000);
  }

  componentWillUnmount() {}

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 60 ? 60 : completed + 100 });
  };
  render() {
    return (
      <div>
        <CircularProgress
          value={this.state.completed}
          variant="static"
          color="primary"
        >
          12
        </CircularProgress>
        12
      </div>
    );
  }
}

export default Rating;
