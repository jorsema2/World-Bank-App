import styled from "styled-components";
import Select from "react-select";


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 999;
`;

export const StyledSelect = styled(Select)`
  width: 400px;
  margin-bottom: 8px;
`;

export const MainContent = styled.div`
  min-height: calc(100vh - 80px - 112px);
  background-image: url(${props => props.backgroundImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;