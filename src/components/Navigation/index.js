import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GithubOutlined, LinkedinFilled } from "@ant-design/icons";
import {
  StyledHeader,
  HeaderMenu,
  Earth,
  Sun,
  Moon,
  MenuItem,
  Container,
} from "./style.js";
import { SmartContext } from "../../App";

const Navigation = () => {
  const { appState, appDispatch } = useContext(SmartContext);

  return (
    <Container>
      <StyledHeader>
        <Link to="/">
          <Earth />
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
          <MenuItem onClick={() => appDispatch({ type: "toggleTheme" })}>
            {appState.isLight && <Sun />}
            {!appState.isLight && <Moon />}
          </MenuItem>
        </HeaderMenu>
      </StyledHeader>
    </Container>
  );
};

export default Navigation;
