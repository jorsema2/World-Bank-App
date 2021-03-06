import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { Container } from "./style"

function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

const SortableMultiValue = SortableElement((props) => {
  // this prevents the menu from being opened/closed when the user clicks
  // on a value to begin dragging it. ideally, detecting a click (instead of
  // a drag) would still focus the control and toggle the menu, but that
  // requires some magic with refs that are out of scope for this example
  const onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { onMouseDown };
  return <components.MultiValue {...props} innerProps={innerProps} />;
});
const SortableSelect = SortableContainer(Select);

export default function MultiSelectSort(props) {
  const [areDisabled, setAreDisabled] = useState(false);

  const onChange = (selectedCountries) => {
    selectedCountries !== null ? props.setSelected(selectedCountries) : props.setSelected([]);
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newValue = arrayMove(props.selected, oldIndex, newIndex);
    props.setSelected(newValue);
  };
  
  useEffect(() => {
    props.selected.length === 3 ? setAreDisabled(true) : setAreDisabled(false);
  }, [props.selected])

  return (
    <Container>
      {!areDisabled && <SortableSelect
      // react-sortable-hoc props:
      axis="xy"
      onSortEnd={onSortEnd}
      distance={4}
      // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
      getHelperDimensions={({ node }) => node.getBoundingClientRect()}
      // react-select props:
      placeholder={"Add another country to chart..."}
      isMulti
      options={props.options}
      value={props.selected}
      onChange={onChange}
      components={{
        MultiValue: SortableMultiValue,
      }}
      closeMenuOnSelect={false}
    />}
    {areDisabled && <SortableSelect
      // react-sortable-hoc props:
      axis="xy"
      onSortEnd={onSortEnd}
      distance={4}
      // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
      getHelperDimensions={({ node }) => node.getBoundingClientRect()}
      // react-select props:
      isMulti
      options={props.options}
      value={props.selected}
      onChange={onChange}
      components={{
        MultiValue: SortableMultiValue,
      }}
      closeMenuOnSelect={false}
      isOptionDisabled={option => option === option}
    />}
    </Container>
  );
}
