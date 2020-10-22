import styled from "styled-components";

export const List = styled.ul`
  height: 100%;
  list-style-type: none;
  border-radius: 5px;
  position: absolute;
  overflow-y: scroll;
  ${(props) => `
background-color:${props.theme.NavMenuBackgroundColor};
border: 1px solid ${props.theme.borderColor};
`}
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
