import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div`
  max-height: 250px;
  width: 80%;
  margin: 1rem auto;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const StyledButton = styled(Button)`
  min-width: 100%;
  height: 90%;
  border-radius: 4px;
  margin: 8px;
  ${(props) => `
background-color:${props.theme.main};
color: ${props.theme.secondary};
border-color: ${props.theme.border};
`}
  span {
    white-space: break-spaces;
  }
`;

export const LoadingMessage = styled.div`
  min-width: 100%;
  height: 90%;
  border-radius: 4px;
  margin: 8px;
  ${(props) => `
background-color:${props.theme.main};
color: ${props.theme.secondary};
border: 2px solid ${props.theme.border};
`}
  p {
    margin: 1rem;
  }
`;
