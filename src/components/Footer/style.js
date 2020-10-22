import styled from "styled-components";
import { MaxWidthContainer } from "../UI/ui.styles";

export const Container = styled.div`
${(props) => `
background-color:${props.theme.NavMenuBackgroundColor};
border-top: 1px solid ${props.theme.borderColor};
box-shadow: ${props.theme.boxShadow};
`}
`;

export const StyledFooter = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  ${(props) => `
  color: ${props.theme.color};
  `}
`;
