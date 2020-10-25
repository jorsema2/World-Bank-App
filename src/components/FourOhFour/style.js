import styled from "styled-components";
import EarthIcon from "../../assets/svg/earth.js";

export const MainContent = styled.div`
  height: 82vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) => `
background-color: ${props.theme.main};
color: ${props.theme.secondary};
h1 {
    color: ${props.theme.secondary};
  }
`}
`;

export const Earth = styled(EarthIcon)`
  height: 256px;
  width: 256px;
  cursor: pointer;
  g {
    fill: #345995;
  }
  g:hover {
    fill: #40a9ff;
  }
`;
