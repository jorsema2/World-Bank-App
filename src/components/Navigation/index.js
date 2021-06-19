import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GithubOutlined, LinkedinFilled } from "@ant-design/icons";
import { IconDescription } from "../UI/ui.styles";
import {
  Container,
  StyledHeader,
  HeaderMenu,
  Earth,
  Sun,
  Moon,
  MenuItem,
  AboutMeButton,
  ExternalLink,
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
            <Link to="/about-me">
              <AboutMeButton>About me</AboutMeButton>
            </Link>
          </MenuItem>
          <MenuItem>
            <ExternalLink
              target="_blank"
              href="https://www.linkedin.com/in/jorge-segura-mart%C3%ADnez-6b53851b3/"
            >
              <LinkedinFilled />
              <IconDescription>LinkedIn</IconDescription>
            </ExternalLink>
          </MenuItem>
          <MenuItem>
            <ExternalLink target="_blank" href="https://github.com/jorsema2">
              <GithubOutlined />
              <IconDescription>GitHub</IconDescription>
            </ExternalLink>
          </MenuItem>
          <div onClick={() => appDispatch({ type: "toggleTheme" })}>
            {appState.isLight && <Sun />}
            {!appState.isLight && <Moon />}
          </div>
        </HeaderMenu>
      </StyledHeader>
    </Container>
  );
};

export default Navigation;
