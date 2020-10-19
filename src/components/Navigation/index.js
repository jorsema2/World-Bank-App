import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  GithubOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import { StyledHeader, HeaderMenu, AppLogo, MenuItem, Container } from "./style.js";
// import { sun, moon } from "../../assets/svg";
import { SmartContext } from "../../App";

const Navigation = () => {
  const { appDispatch } = useContext(SmartContext);

  return (
    <Container>
      <StyledHeader>
        <Link to="/">
          <AppLogo />
        </Link>
        <HeaderMenu>
          <MenuItem>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/jorge-segura-mart%C3%ADnez-6b53851b3/"
            >
              <LinkedinFilled />
              LinkedIn
            </a>
          </MenuItem>
          <MenuItem>
            <a target="_blank" href="https://github.com/jorsema2">
              <GithubOutlined /> GitHub
            </a>
          </MenuItem>
          <MenuItem>
            <button onClick={() => appDispatch({ type: "toggleTheme" })}>
              Toggle
            </button>
          </MenuItem>
        </HeaderMenu>
      </StyledHeader>
    </Container>
  );
};

export default Navigation;
