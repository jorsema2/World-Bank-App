import styled from "styled-components";
import { MaxWidthContainer } from "../UI/ui.styles";
import EarthIcon from "../../assets/svg/earth.js";
import SunIcon from "../../assets/svg/sun.js";
import MoonIcon from "../../assets/svg/moon.js";

export const Container = styled.div`
  height: 8vh;
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

export const HeaderMenu = styled.div`
  width: 33%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Earth = styled(EarthIcon)`
  g {
    fill: #345995;
  }
`

export const Sun = styled(SunIcon)`
  g {
    fill: #111;
  }
`;

export const Moon = styled(MoonIcon)`
  g {
    fill: white;
  }
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
