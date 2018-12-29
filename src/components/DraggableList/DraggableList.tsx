import React, { Component } from "react";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { List, Record } from "immutable";

import { getList } from "./helpers/getList";

type Props = {
  items: List<Record<any>>;
  dragCompleted: (updatedItems: List<Record<any>>) => void;
  renderItemContent: (item: Record<any>) => JSX.Element;
  itemStyle?: any;
  listStyle?: any;
};

export class DraggableList extends Component<Props> {
  /**
   * Completion handler for when drag finishes
   *
   * @param result The result of the drop operation
   */
  onDragEnd(result: DropResult) {
    const { dragCompleted, items } = this.props;

    // Convert the list items to a mutable array
    // Not the most ideal solution, as it makes our immutable list mutable,
    // but for now it allows us to re-use the example logic from the
    // ReactDnD documentation
    const propItems = items.toArray();

    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    // Extract the removed (dragged) item
    const [removed] = propItems.splice(result.source.index, 1);

    // Insert the item at the location it was dropped
    propItems.splice(result.destination.index, 0, removed);

    // Convert the array back to a list and execute the prop completion handler
    dragCompleted(List(propItems));
  }

  render() {
    const { items, renderItemContent, itemStyle, listStyle } = this.props;

    return (
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
        <Droppable droppableId="droppable">
          {getList(items, renderItemContent, listStyle, itemStyle)}
        </Droppable>
      </DragDropContext>
    );
  }
}
