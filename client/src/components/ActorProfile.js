import React from "react";

import "../css/ActorProfile.css";

const ActorProfile = props => {
  let name = props.cast.name.split(" ", 1);
  return (
    <div className="profileContainer">
      <div className="circle">
        <img
          className="actorImage"
          src={"https://image.tmdb.org/t/p/original/" + props.cast.profile_path}
        />
      </div>
      <span className="actorName">{name}</span>
    </div>
  );
};

export default ActorProfile;
