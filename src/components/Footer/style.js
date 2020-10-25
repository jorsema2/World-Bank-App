import styled from "styled-components";
import { MaxWidthContainer } from "../UI/ui.styles";

export const Container = styled.div`
height: 112px;
  ${(props) => `
background-color: #FAFAFA;
padding-top: 16px;
padding-bottom: 16px;
`}
`;

export const StyledFooter = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${(props) => `
  color: ${props.theme.secondary};
  border-top: 3px solid #345995;
`}
height: 100%;
`;

export const FooterParagraph = styled.p`
  ${(props) => `
color: ${props.theme.secondary};
`}
margin: 0;
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
