import React, { Component } from "react";
import { Close } from "@material-ui/icons";

import Spinner from "./Spinner";

import { createApolloFetch } from "apollo-fetch";
import { connect } from "react-redux";
import { toggleActorModal, handleActor } from "../actions/movieActions";

const fetch = createApolloFetch({
  uri: "http://localhost:4000/graphql"
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
        <div>
          <Close
            style={{ fontSize: "3rem", position: "absolute", top: 0, right: 0 }}
            onClick={() =>
              this.props.toggleActorModal(!this.props.actorModalOpen)
            }
          />
          <div className="actorImageContainer">
            <img
              className="actorImage"
              src={"https://image.tmdb.org/t/p/original" + profile_path}
            />
            <span className="actorName">{name}</span>
          </div>
          <div className="actorLifeContainer">
            <span className="actorBirthDay">{birthday}</span>{" "}
            <span className="actorPlaceOfBirth">{place_of_birth}</span>
            <span className="deathDay">{deathday}</span>
          </div>
          <span className="actorBiography">{biography}</span>!
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
