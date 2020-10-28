import React from "react";
import groupedIndicators from "../../utils/groupedIndicators";
import { List, GroupTitle, ListSection, ListItem } from "./style";

const RecommendedIndicators = (props) => {
  const changeIndicator = (newIndicator) => {
    const hasSearch = props.search && props.search.compareTo;

    const otherCountries = hasSearch
      ? `?compareTo=${props.search.compareTo}`
      : "";

    props.history.push(
      `/indicator/${props.currentCountry}/${newIndicator.id}/${otherCountries}`
    );
  };

  return (
    <List>
      {groupedIndicators.map((group) => (
        <div key={group.label}>
          <GroupTitle>{group.label}</GroupTitle>
          <ListSection>
            {group.options.map((item) => (
              <ListItem
                key={item.id}
                value={item}
                onClick={() => changeIndicator(item)}
              >
                {item.label}
              </ListItem>
            ))}
          </ListSection>
        </div>
      ))}
    </List>
  );
};

export default RecommendedIndicators;
