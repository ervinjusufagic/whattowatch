import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Watched from "./Watched";
import Unwatched from "./Unwatched";

import { connect } from "react-redux";
import { initUnwatched } from "../actions/dashboardActions";

import { createApolloFetch } from "apollo-fetch";

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

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
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

const mapDispatchToProps = {
  initUnwatched
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mylist);
