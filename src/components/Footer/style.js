import styled from "styled-components";
import { MaxWidthContainer } from "../UI/ui.styles";

export const Container = styled.div`
  height: 112px;
  padding-top: 16px;
  padding-bottom: 16px;
  ${(props) => `
background-color: ${props.theme.main};
color: ${props.theme.secondary};
`}
`;

export const StyledFooter = styled(MaxWidthContainer)`
  height: 100%;
  border-top: 3px solid #345995;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${(props) => `
  color: ${props.theme.secondary};
`}
`;

export const ParagraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`;

export const FooterParagraph = styled.p`
  fontweight: bold;
  margin: 0;
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
