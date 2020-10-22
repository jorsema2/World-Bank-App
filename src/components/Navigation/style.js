import styled from "styled-components";
import { MaxWidthContainer } from "../UI/ui.styles";

export const Container = styled.div`
  position: relative;
  ${(props) => `
  background-color:${props.theme.NavMenuBackgroundColor};
  border-bottom: 1px solid ${props.theme.borderColor};
  box-shadow: ${props.theme.boxShadow};
`}
`;

export const StyledHeader = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${(props) => `
  color: ${props.theme.color};
`}
`;

export const HomeButton = styled.span`
  font-size: 2rem;
  color: #345995;
  ${(props) => `
background-color:${props.theme.NavMenuBackgroundColor};
color: ${props.theme.color};
`}
`;

export const HeaderMenu = styled.div`
  width: 33%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
