import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
    return (
      <div>
        <Link to={`/`}>
          <button>Home</button>
        </Link>
      </div>
    );
}

export default Header;