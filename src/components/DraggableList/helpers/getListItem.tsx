import React, { CSSProperties } from "react";

import { List } from "antd";
import { DraggableStateSnapshot, DraggableProvided } from "react-beautiful-dnd";
import { Record } from "immutable";

import styled from "styled-components";

type ItemProps = {
  passedStyle: any;
};

const ItemOuter = styled.div<ItemProps>`
  ${({ passedStyle }) => passedStyle}
`;

/**
 * Returns the style object for a list item
 * based on its dragging state
 *
 * @param isDragging      Whether the item is dragging or not
 * @param draggableStyle  The applied style of the item as it is being dragged
 */
const getItemStyle = (
  isDragging: boolean,
  draggableStyle?: object
): CSSProperties => ({
  ...draggableStyle,
  userSelect: "none",
  cursor: "default",
  boxShadow: isDragging ? "0px 3px 9px rgba(0, 0, 0, 0.15)" : "none"
});

/**
 * Returns a list item component for a given record
 *
 * @param item        The record to render
 * @param renderer    A function that returns the item component body
 * @param itemStyle   The style of the outer list item component
 */
export const getListItem = (
  item: Record<any>,
  renderer: (item: Record<any>) => JSX.Element,
  itemStyle: object
) => (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
  const props = {
    ...provided.draggableProps,
    ...provided.dragHandleProps,
    ref: provided.innerRef,
    style: getItemStyle(snapshot.isDragging, provided.draggableProps.style)
  };

  return (
    <ItemOuter passedStyle={itemStyle} {...props}>
      <List.Item>{renderer(item)}</List.Item>
    </ItemOuter>
  );
};
