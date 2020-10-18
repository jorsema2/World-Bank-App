import styled from 'styled-components';
import { Layout } from "antd";
import {MaxWidthContainer} from '../UI/ui.styles'

const { Header } = Layout;

export const Container = styled.div`
background-color: green;
box-shadow: 10px 10px 10px rgba(0,0,0,0.2);
`;

export const StyledHeader = styled(MaxWidthContainer)`
 
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AppTitle = styled.div`
  width: 33%;
  display: flex;
  flex-direction: row;
  font-size: 3rem;
`;

export const HeaderMenu = styled.div`
  width: 33%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const MenuItem = styled.div`
  color: black;
  font-size: 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-left: 12px;
`;