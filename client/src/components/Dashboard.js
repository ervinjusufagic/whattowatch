import { Link, Route, Switch } from "react-router-dom";
import React, { Component } from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ListIcon from "@material-ui/icons/ListRounded";
import SearchIcon from "@material-ui/icons/SearchRounded";
import DachBoardIcon from "@material-ui/icons/DashboardRounded";

import Movies from "./Movies";
import Search from "./Search";
import Mylist from "./Mylist";
import Login from "./Login";
import SignUp from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";

import { connect } from "react-redux";
import { initUnwatched } from "../actions/dashboardActions";

import { createApolloFetch } from "apollo-fetch";

import "../css/Dashboard.css";

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

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
});

class Dashboard extends Component {
  componentWillMount() {
    this.fetchUnwatchedMovies();
  }

  fetchUnwatchedMovies() {
    let user = localStorage.getItem("user");
    fetch({
      query: `query RndmIdQuery($user: String!) {
        unwatchedMovies(user: $user){
          movie{
            id
            imdb_id
            title
            overview
            poster_path
            release_date
            vote_average
            vote_count
            runtime
            genres{
              id
              name
            }
            videos{
              results{
                id
                key
                type
              }
            }
            credits{
              cast{
                id
                name
                character
                profile_path
              }
            }
          }
        }
      }
    `,
      variables: { user }
    }).then(res => {
      this.props.initUnwatched(res.data.unwatchedMovies);
    });
  }

  render() {
    return (
      <div className="dashboard">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <ProtectedRoute exact path="/" component={Movies} />
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

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
