import React from "react";

import { List as AntList } from "antd";
import { ListProps } from "antd/lib/list";
import { getListItem } from "./getListItem";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";

import styled from "styled-components";
import { List, Record } from "immutable";

type StyledListProps = {
  passedStyles: any;
};

type ItemRenderer = (item: Record<any>) => JSX.Element;

/**
 * Returns a list item wrapped in a draggable component
 *
 * @param renderer    Function that returns the list item component body
 * @param itemStyle   Style of the list item
 */
const getDraggableListItem = (renderer: ItemRenderer, itemStyle: any) => (
  item: any,
  index: number
) => (
  <Draggable key={item.id} draggableId={item.id} index={index}>
    {getListItem(item, renderer, itemStyle)}
  </Draggable>
);

/**
 * An outer DIV wrapping the Ant Design list
 * using styles passed to the getList() function
 */
const ListOuter = styled.div<StyledListProps>`
  ${({ passedStyles }) => passedStyles}
`;

/**
 * Renders a draggable list of records
 *
 * @param items       A list of records to render
 * @param renderer    A function that returns the list item component body
 * @param listStyle  The style of the outer list
 * @param itemStyle   The style of the outer list item
 */
export const getList = (
  items: List<Record<any>>,
  renderer: ItemRenderer,
  listStyle: any,
  itemStyle: any
) => (provided: DroppableProvided) => (
  <div ref={provided.innerRef}>
    <ListOuter passedStyles={listStyle}>
      <AntList
        dataSource={items}
        renderItem={getDraggableListItem(renderer, itemStyle)}
      />
    </ListOuter>
    {provided.placeholder}
  </div>
);
