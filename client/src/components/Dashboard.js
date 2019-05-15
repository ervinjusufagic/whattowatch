import { Link, Route, Switch } from "react-router-dom";
import React, { Component } from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ListIcon from "@material-ui/icons/ListRounded";
import SearchIcon from "@material-ui/icons/SearchRounded";
import DachBoardIcon from "@material-ui/icons/DashboardRounded";

import Deck from "./Deck";
import Search from "./Search";
import Mylist from "./Mylist";
import Login from "./Login";
import SignUp from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";

import { connect } from "react-redux";
import { initUnwatched } from "../actions/dashboardActions";

import "../css/Dashboard.css";

const styles = {
  menu: {
    backgroundColor: "#000022",
    borderWidth: "1px",
    borderColor: "black",
    position: "sticky"
  },
  button: {
    color: "#E28413"
  }
};

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <ProtectedRoute
            exact
            path="/"
            component={Deck}
            key={this.props.deckKey}
          />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute exact path="/mylist" component={Mylist} />
          <Route path="*" component={() => "404 not found"} />
        </Switch>

        <BottomNavigation
          value={this.props.value}
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

const mapDispatchToProps = {
  initUnwatched
};

const mapStateToProps = state => ({
  deckKey: state.deckKey
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
