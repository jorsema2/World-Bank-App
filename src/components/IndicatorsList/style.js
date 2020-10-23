import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 40%;
  overflow-y: scroll;
`;

export const StyledButton = styled(Button)`
  margin: 8px;
  ${(props) => `
background-color:${props.theme.MainBodyBackgroundColor};
color: ${props.theme.color};
borderColor: ${props.theme.borderColor}
`}
`;
