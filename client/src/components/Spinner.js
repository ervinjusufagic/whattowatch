import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  view: {
    height: "100vh",
    display: "flex",
    flex: "1",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  spinner: {
    color: "#E28413"
  }
};

function Spinner(props) {
  return (
    <div style={styles.view}>
      <CircularProgress style={styles.spinner} />
    </div>
  );
}

export default Spinner;
