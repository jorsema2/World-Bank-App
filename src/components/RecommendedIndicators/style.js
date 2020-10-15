import styled from "styled-components";

export const List = styled.ul`
  background-color: white;
  border: 1px solid black;
  height: 100%;
  list-style-type: none;
  overflow-y: scroll;
`;

export const ListSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ListItem = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  text-align: start;
`;
