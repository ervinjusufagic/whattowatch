import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Watched from "./Watched";
import Unwatched from "./Unwatched";

import { connect } from "react-redux";
import { initUnwatched, initWatched } from "../actions/dashboardActions";

import { createApolloFetch } from "apollo-fetch";

import "../css/myList.css";

const styles = {
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: "#000022",
    flexGrow: 1
  },
  Tab: {
    justifyContent: "flex-start",
    color: "#E28413",
    indicator: "#E28413"
  },
  indicatior: {
    backgroundColor: "white"
  }
};

const fetch = createApolloFetch({
  uri: "https://whattowatch-api.herokuapp.com/graphql"
});

class Mylist extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  componentWillMount() {
    if (localStorage.getItem("user")) {
      this.fetchUnwatchedMovies();
    }
  }

  fetchUnwatchedMovies() {
    let user = localStorage.getItem("user");
    fetch({
      query: `query fetchUnwatched($user: String!) {
        unwatchedMovies(user: $user){
            id
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
    `,
      variables: { user }
    }).then(res => {
      this.props.initUnwatched(res.data.unwatchedMovies);
    });

    fetch({
      query: `query fetchWatched($user: String!) {
        watchedMovies(user: $user){
            id
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
    `,
      variables: { user }
    }).then(res => {
      this.props.initWatched(res.data.watchedMovies);
    });
  }

  render() {
    return (
      <div className="myList">
        <AppBar position="fixed" style={styles.appBar}>
          <Tabs
            variant="fullWidth"
            value={this.state.value}
            onChange={this.handleChange}
            className="tabBar"
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

const mapDispatchToProps = {
  initUnwatched,
  initWatched
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mylist);
