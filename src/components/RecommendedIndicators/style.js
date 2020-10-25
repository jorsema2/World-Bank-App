import styled from "styled-components";

export const List = styled.ul`
  height: 100%;
  max-height: 300px;
  list-style-type: none;
  border-radius: 5px;
  overflow-y: scroll;
  ${(props) => `
  background-color:${props.theme.secondBackground};
  border: 1px solid ${props.theme.border};
  color: ${props.theme.secondary};
`}
`;

export const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ListItem = styled.li`
  outline: none;
  text-align: start;
  cursor: pointer;
`;
