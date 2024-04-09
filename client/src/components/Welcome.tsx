import React from "react";
import { Link } from "react-router-dom";

function Welcome() {

  return (
    <div>
      <Link to="/plateDetection">
        <button>Plate Detection</button>
      </Link>
      <Link to="/patternDetection">
        <button>Pattern Detection</button>
      </Link>
    </div>
  );
}

export default Welcome;
