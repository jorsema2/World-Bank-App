import React from "react";
import {
  MailOutlined,
  GithubOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import {Container, StyledFooter, FooterMenu, MenuItem} from "./style"

const Footer = (props) => (
  <Container>
    <StyledFooter>
      <div>
        <h3>Welcome to World Charts</h3>
        <h4>A React App by Jorge Segura</h4>
      </div>
      <FooterMenu>
        <MenuItem>
          <a href="mailto: jorsema2@gmail.com">
            <MailOutlined />
            jorsema2@gmail.com
          </a>
        </MenuItem>
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
      </FooterMenu>
    </StyledFooter>
  </Container>
);

export default Footer;
