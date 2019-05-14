import React, { Component } from "react";
import { Close } from "@material-ui/icons";

import Spinner from "./Spinner";
import MyListItem from "./MyListItem";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";
import { toggleActorModal, handleActor } from "../actions/movieActions";

import "../css/ActorProfile.css";

const fetch = createApolloFetch({
  uri: "https://whattowatch-api.herokuapp.com/graphql"
});

class ActorProfile extends Component {
  componentWillMount() {
    this.fetchActor();
  }

  fetchActor() {
    const id = this.props.actorId;
    fetch({
      query: `query ActorQuery($id: Int!) {
            actor(id:$id){
              id
              name
              biography
              place_of_birth
              profile_path
              birthday
              deathday
              movie_credits{
                cast{
                  id
                  title,
                  overview,
                  poster_path
                }
              }
            } 
          }
        
      `,
      variables: { id }
    }).then(res => {
      console.log(res.data);
      this.props.handleActor(res.data);
      console.log(this.props.actor);
    });
  }

  render() {
    if (this.props.loadingActor) {
      return <Spinner />;
    } else {
      const {
        biography,
        birthday,
        deathday,
        movie_credits,
        name,
        place_of_birth,
        profile_path
      } = this.props.actor.actor;
      return (
        <div className="actorProfileView">
          <Close
            style={{ fontSize: "3rem", position: "absolute", top: 0, right: 0 }}
            onClick={() =>
              this.props.toggleActorModal(!this.props.actorModalOpen)
            }
          />
          <div className="actorImageContainer">
            <div className="actorImageCircle">
              <img
                className="actorDetailedImage"
                src={"https://image.tmdb.org/t/p/original" + profile_path}
              />
            </div>
            <div className="detailedActorOverview">
              <span className="actorDetailedName">{name}</span>
              <span className="actorBirthDay">
                <span className="actorOverviewTitle textHighlight">Born</span>{" "}
                {birthday} in {place_of_birth}
              </span>
              <span className="deathDay">
                <span className="actorOverviewTitle textHighlight">Died</span>{" "}
                {deathday}
              </span>
              <span className="actorOverviewTitle textHighlight">Overview</span>
              <span className="actorBiography">{biography}</span>
            </div>
          </div>
          <div className="actorMovies">
            {movie_credits.cast.map(movie => {
              return <MyListItem key={movie.id} movie={movie} />;
            })}
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = {
  toggleActorModal,
  handleActor
};

const mapStateToProps = state => ({
  actorModalOpen: state.actorModalOpen,
  actor: state.actor,
  loadingActor: state.loadingActor
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActorProfile);
