import styled from "styled-components";
import { Button } from "antd";

export const MainContent = styled.div`
  height: 82vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) => `
background-color: ${props.theme.main};
color: ${props.theme.secondary};
h3 {
    color: ${props.theme.secondary};
  }
`}
`;

export const StyledButton = styled(Button)`
  ${(props) => `
background-color:${props.theme.secondBackground};
color: ${props.theme.secondary};
borderColor: ${props.theme.border}
`}
`;