import React, { Component } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import styled from 'styled-components';

const SortableItem = SortableElement(({ value }) => <ItemDiv>{value}</ItemDiv>);

const ItemDiv = styled.div`
  border-width: 1px;
  border-style: solid;
  padding: 10px;
  flex: 1;
  background-color: whitesmoke;
`;

const ParentDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  padding: 10px;
  box-sizing: border-box;

  div + div {
    margin-top: -1px;
  }
`;

const ParentDiv1 = styled.div`
  border-width: 1px;
  border-style: solid;
  padding: 10px;
  width: 100;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
`;

const SortableList = SortableContainer(({ items }) => {
  return (
    <ParentDiv1>
      <ParentDiv>
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} value={value} />
        ))}
      </ParentDiv>
    </ParentDiv1>
  );
});

export class SortableComponent extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };
  render() {
    return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
  }
}
