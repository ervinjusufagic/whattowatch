import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Watched from "./Watched";
import Unwatched from "./Unwatched";

import "../css/myList.css";

const styles = {
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "#acacac",
    flexGrow: 1
  },
  Tab: {
    justifyContent: "flex-start",
    color: "#2C1E5A",
    indicator: "2C1E5A"
  }
};

class Mylist extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <div className="myList">
        <AppBar position="fixed" style={styles.appBar}>
          <Tabs
            variant="fullWidth"
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
          >
            <Tab style={styles.Tab} label="Unwatched" />
            <Tab style={styles.Tab} label="Watched" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && <Unwatched />}
        {this.state.value === 1 && <Watched />}
      </div>
    );
  }
}

export default Mylist;
