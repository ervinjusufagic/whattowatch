import React, { Component } from "react";
import "../css/myList.css";

import SearchResult from "./SearchResult";

class Watched extends Component {
  render() {
    return (
      <div className="myList">
        <SearchResult />
      </div>
    );
  }
}

export default Watched;
