import React from "react";
import {
  MailOutlined,
  GithubOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import { IconDescription } from "../UI/ui.styles";
import {
  Container,
  StyledFooter,
  ParagraphContainer,
  FooterParagraph,
  FooterMenu,
  MenuItem,
  ExternalLink,
} from "./style";

const Footer = () => (
  <Container>
    <StyledFooter>
      <ParagraphContainer>
        <FooterParagraph>Welcome to World Charts</FooterParagraph>
        <FooterParagraph>A React App by Jorge Segura</FooterParagraph>
      </ParagraphContainer>
      <FooterMenu>
        <MenuItem>
          <ExternalLink href="mailto: jorsema2@gmail.com">
            <MailOutlined />
            <IconDescription>jorsema2@gmail.com</IconDescription>
          </ExternalLink>
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
            <IconDescription>GitHub</IconDescription>
            <GithubOutlined />
          </ExternalLink>
        </MenuItem>
      </FooterMenu>
    </StyledFooter>
  </Container>
);

export default Footer;
