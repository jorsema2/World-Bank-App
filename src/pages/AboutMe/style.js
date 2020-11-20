import styled from "styled-components";
import { Button } from "antd";
import { MaxWidthContainer } from "../../components/UI/ui.styles";

export const MainContent = styled(MaxWidthContainer)`
  min-height: calc(100vh - 80px - 112px);
  background-color: ${(props) => props.theme.main};
  display: flex;
  align-items: flex-start;
  flex-direction: row;
`;

export const ContentLeftContainer = styled.div`
  width: 66.66%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Header = styled.div`
  padding: 32px 48px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const MyName = styled.h1`
  font-size: 2.5rem;
`;

export const StyledButton = styled(Button)`
  border-radius: 4px;
  height: 38px;
  min-width: 128px;
  ${(props) => `
background-color: #345995;
color: ${props.theme.main};
border-color: #345995;
`}
`;

export const ContentRightContainer = styled.div`
  width: 33.33%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const LeftContainerSection = styled.div`
  padding: 32px 48px;
`;

export const TopicSection = styled.div`
  padding: 24px 0px;
`;

export const TopicSectionTitle = styled.h2`
  color: #345995;
  font-weight: 600;
`;

export const TopicSectionItem = styled.div`
  padding: 12px 0px;
`;

export const SectionFragmentTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding-bottom: 8px;
`;

export const ContactInfoSection = styled.div`
  padding: 48px;
  line-height: 1rem;
`;

export const RightContainerSection = styled.div`
  padding: 32px 48px;
`;

export const RightSectionList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  line-height: 2rem;
`;

export const ExternalLink = styled.a`
  ${(props) => `
color: ${props.theme.secondary};
`}
`;
