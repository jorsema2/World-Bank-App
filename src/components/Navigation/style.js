import styled from "styled-components";
import { GlobalOutlined } from "@ant-design/icons";
import { MaxWidthContainer } from "../UI/ui.styles";

export const Container = styled.div`
  ${(props) => `
  background-color:${props.theme.backgroundColor};
  color: ${props.theme.inputTextColor};
  box-shadow: ${props.theme.boxShadow};
`}
`;

export const StyledHeader = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${(props) => `
  background-color:${props.theme.backgroundColor};
  color: ${props.theme.inputTextColor};
`}
`;

export const AppLogo = styled(GlobalOutlined)`
  font-size: 2rem;
  ${(props) => `
background-color:${props.theme.backgroundColor};
color: ${props.theme.inputTextColor};
`}
`;

export const HeaderMenu = styled.div`
  width: 33%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const MenuItem = styled.div`
  color: black;
  font-size: 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-left: 12px;
`;
