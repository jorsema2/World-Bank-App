import styled from "styled-components";

export const List = styled.ul`
  height: 100%;
  max-height: 300px;
  list-style-type: none;
  border-radius: 5px;
  overflow-y: scroll;
  ${(props) => `
  background-color:${props.theme.secondBackground};
  color: ${props.theme.secondary};
  padding: 0;
  font-size: 18px;
`}
`;

export const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
`;

export const ListItem = styled.li`
  outline: none;
  text-align: start;
  cursor: pointer;
  padding: 0;
`;
