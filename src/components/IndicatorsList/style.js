import styled from "styled-components";
import { Button } from "antd";

export const Container = styled.div`
  max-height: 250px;
  width: 400px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: ${props => props.theme.secondBackground};
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  margin: 8px;
  ${(props) => `
background-color:${props.theme.main};
color: ${props.theme.secondary};
border-color: ${props.theme.border};
`}
`;

export const LoadingMessage = styled.p`
  margin: 16px;
  ${(props) => `
  color: ${props.theme.secondary};
  `}
`;
