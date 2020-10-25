import React from "react";
import {
  MailOutlined,
  GithubOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import {Container, StyledFooter, FooterParagraph, FooterMenu, MenuItem, ExternalLink} from "./style"

const Footer = (props) => (
  <Container>
    <StyledFooter>
      <div>
        <FooterParagraph>Welcome to World Charts</FooterParagraph>
        <FooterParagraph>A React App by Jorge Segura</FooterParagraph>
      </div>
      <FooterMenu>
        <MenuItem>
          <ExternalLink href="mailto: jorsema2@gmail.com">
            <MailOutlined />
            jorsema2@gmail.com
          </ExternalLink>
        </MenuItem>
        <MenuItem>
          <ExternalLink
            target="_blank"
            href="https://www.linkedin.com/in/jorge-segura-mart%C3%ADnez-6b53851b3/"
          >
            <LinkedinFilled />
            LinkedIn
          </ExternalLink>
        </MenuItem>
        <MenuItem>
          <ExternalLink target="_blank" href="https://github.com/jorsema2">
            <GithubOutlined /> GitHub
          </ExternalLink>
        </MenuItem>
      </FooterMenu>
    </StyledFooter>
  </Container>
);

export default Footer;
