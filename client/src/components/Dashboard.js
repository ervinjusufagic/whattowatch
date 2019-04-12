import { BrowserRouter, Link, Route } from "react-router-dom";
import React, { Component } from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Icon from "@material-ui/core/Icon";

import ListIcon from "@material-ui/icons/ListRounded";
import SearchIcon from "@material-ui/icons/SearchRounded";
import DachBoardIcon from "@material-ui/icons/DashboardRounded";

import "../css/Dashboard.css";

import Movies from "./Movies";
import Search from "./Search";
import Mylist from "./Mylist";

const styles = {
  menu: {
    backgroundColor: "#acacac",
    borderWidth: "1px",
    borderColor: "black"
  },
  button: {
    color: "#2C1E5A"
  }
};

class Dashboard extends Component {
  state = {
    value: "movies"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    return (
      <div className="dashboard">
        <Route exact path="/" component={Movies} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/mylist" component={Mylist} />

        <BottomNavigation
          value={this.state.value}
          onChange={this.handleChange}
          style={styles.menu}
        >
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Movies"
            value="movies"
            icon={<DachBoardIcon />}
            style={styles.button}
          />

          <BottomNavigationAction
            component={Link}
            to="/search"
            label="Search"
            value="search"
            icon={<SearchIcon />}
            style={styles.button}
          />

          <BottomNavigationAction
            component={Link}
            to={"/mylist"}
            label="My List"
            value="list"
            icon={<ListIcon />}
            style={styles.button}
          />
        </BottomNavigation>
      </div>
    );
  }
}

export default Dashboard;
