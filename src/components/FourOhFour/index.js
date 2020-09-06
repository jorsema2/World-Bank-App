import React from "react";
import Header from "../Header"

const FourOhFour = () => {
  return (
    <div>
      <Header />
      <h1>404 Error: Not Found</h1>
      <br></br>
      <p>
        The page that you want to see does not exist. This may be because the
        data that you are requesting doesn't exist in the API.

        If you click in "by topic", you will see only indicators that have data.
      </p>
    </div>
  );
};

export default FourOhFour;