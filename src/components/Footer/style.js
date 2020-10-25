import styled from "styled-components";
import { MaxWidthContainer } from "../UI/ui.styles";

export const Container = styled.div`
  height: 10vh;
  ${(props) => `
background-color: ${props.theme.main};
border-top: 1px solid ${props.theme.border};
`}
`;

export const StyledFooter = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${(props) => `
  color: ${props.theme.secondary};
`}
`;

export const FooterParagraph = styled.p`
  ${(props) => `
color: ${props.theme.secondary};
`}
`;

export const FooterMenu = styled.div`
  display: flex;
  align-items: baseline;
  align-self: flex-end;
  justify-content: space-between;
  width: 50%;
`;

export const MenuItem = styled.div`
  font-size: 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-left: 12px;
`;

export const ExternalLink = styled.a`
  ${(props) => `
color: ${props.theme.secondary};
`}
`;
