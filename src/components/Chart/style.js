import styled from "styled-components";
import { Line, Bar } from "react-chartjs-2";

export const Container = styled.div`
  height: 100%;
  position: relative;

  @media (max-width: 1080px) {
    max-width: 800px;
  }

  @media (max-width: 425px) {
    max-width: 320px;
  }
`;

export const StyledLine = styled(Line)`
  height: 100%;
`;
export const StyledBar = styled(Bar)`
  height: 100%;
`;
