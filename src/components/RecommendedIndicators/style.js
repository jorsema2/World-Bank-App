import styled from "styled-components";

export const List = styled.ul`
  height: 100%;
  max-height: 300px;
  font-size: 18px;
  border-radius: 5px;
  padding: 0;
  list-style-type: none;
  overflow-y: scroll;
  ${(props) => `
  background-color:${props.theme.secondBackground};
  color: ${props.theme.secondary};
`}
`;

export const GroupTitle = styled.li`
  font-weigth: bold;
  margin: 8px 0;
  ${(props) => `
color: ${props.theme.secondary};
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
