import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

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
    color: "#2C1E5A"
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
