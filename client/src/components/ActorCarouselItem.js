import React from "react";
import Person from "../resources/baseline_person_black_48dp.png";
import "../css/ActorCarouselItem.css";

const ActorCarouselItem = props => {
  let name = props.cast.name.split(" ", 1);
  let image;

  if (props.cast.profile_path !== null) {
    image = "https://image.tmdb.org/t/p/original/" + props.cast.profile_path;
  } else {
    image = Person;
  }

  return (
    <div className="profileContainer">
      <div className="circle">
        <img className="actorImage" src={image} alt="" />
      </div>
      <span className="actorName">{name}</span>
    </div>
  );
};

export default ActorCarouselItem;
