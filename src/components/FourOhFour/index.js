import React from "react";
import { Link } from "react-router-dom";
import { MainContent, Earth } from "./style";

const FourOhFour = () => {
  return (
    <MainContent>
      <h1>404 Error: Not Found</h1>
      <p>
        The page that you want to see does not exist. This may be because an
        invalid URL was introduced.
      </p>
      <p>Please, click in the Earth icon to go back to home.</p>
      <Link to="/">
        <Earth />
      </Link>
    </MainContent>
  );
};

export default FourOhFour;
