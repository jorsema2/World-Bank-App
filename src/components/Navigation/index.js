import React from "react";
import {Link} from "react-router-dom";
import {
  GlobalOutlined,
  GithubOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import {
  StyledHeader,
  AppTitle,
  HeaderMenu,
  MenuItem,
  Container,
} from "./style.js";

const Navigation = () => (
  <Container>
    <StyledHeader>
      <AppTitle>
        <Link to="/">
          <GlobalOutlined /> World Charts
        </Link>
      </AppTitle>
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
      </HeaderMenu>
    </StyledHeader>
  </Container>
);

export default Navigation;
