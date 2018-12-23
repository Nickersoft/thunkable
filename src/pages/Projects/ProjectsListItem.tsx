import React, { PureComponent, Ref } from "react";

import { Record } from "immutable";
import { Input } from "antd";

import styled from "styled-components";

import { Project } from "./Project";

import avatarImage from "../../images/avatar.png";
import ListItemIcon from "./ProjectsListIcon";

// DOM element wrapping the inner content
// of an individual list item
const ListItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 24px;
  width: 100%;
`;

// The project title on each list element
const ListItemHeader = styled.span`
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.875rem;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 9rem;

  @media (max-width: 850px) {
    flex: grow;
  }
`;

// The "last modified" text that appears
// on each list item
const ListItemModified = styled.div`
  flex: 1;
  opacity: 0.5;
  color: #000;
  font-weight: 400;
  font-size: 0.875rem;
  padding: 0 1rem;
  text-align: center;
  line-height: 2.14rem;

  @media (max-width: 850px) {
    display: none;
  }
`;

// The avatar image that appears at the
// far left of each item row
const ListItemImage = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 1.5rem;
`;

// Formats the given date using the standard format
const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

type Props = {
  project: Record<Project>;
  onDeletePressed: (project: Record<Project>) => void;
  onEditPressed: (project: Record<Project>) => void;
  onSave: (project: Record<Project>) => void;
  onEditingCancelled: () => void;
  editFieldRef: Ref<Input>;
};

class ProjectsListItem extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);

    this.onEditInputKeyUp = this.onEditInputKeyUp.bind(this);
    this.onEditPressed = this.onEditPressed.bind(this);
    this.onDeletePressed = this.onDeletePressed.bind(this);
  }

  /**
   * Callback for `keyUp` events in the edit input box.
   * We use this to look for "Enter" hits (keycode 13), so we can
   * trigger a project save / edit.
   *
   * @param event The React keyboard event
   */
  onEditInputKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    // If we press the "Enter" key, save the project
    const { value } = event.currentTarget;

    if (event.keyCode === 13 && value.trim().length > 0) {
      const { project, onSave } = this.props;

      onSave(project.set("title", value));
    }
  }

  /**
   * Wrapper around the `onEditPressed` prop so we
   * don't have to create a new function in the render method
   */
  onEditPressed() {
    const { project, onEditPressed } = this.props;
    onEditPressed(project);
  }

  /**
   * Wrapper around the `onDeletePressed` prop so we
   * don't have to create a new function in the render method
   */
  onDeletePressed() {
    const { project, onDeletePressed } = this.props;
    onDeletePressed(project);
  }

  /**
   * Returns the component for the textbox that allows
   * you to edit project names
   */
  getEditField() {
    const { project, editFieldRef, onEditingCancelled } = this.props;

    const title = project.get("title");

    return (
      <Input
        ref={editFieldRef}
        defaultValue={title}
        onBlur={onEditingCancelled}
        onKeyUp={this.onEditInputKeyUp}
        placeholder="Name your project"
      />
    );
  }

  render() {
    const { project } = this.props;

    const isEditing = project.get("isEditing");
    const isCreating = project.get("isCreating");
    const title = project.get("title");
    const lastModified = project.get("lastModified");

    let contents = null;

    // Only render the edit box if we're creating a new row
    if (isCreating) {
      contents = <ListItemHeader>{this.getEditField()}</ListItemHeader>;
    } else {
      contents = (
        <>
          <ListItemHeader>
            {isEditing ? this.getEditField() : title}
          </ListItemHeader>
          {!isEditing && <ListItemIcon.Edit onClick={this.onEditPressed} />}
          <ListItemModified>{formatDate(lastModified)}</ListItemModified>
          <ListItemIcon.Delete onClick={this.onDeletePressed} />
        </>
      );
    }

    return (
      <ListItemWrapper>
        <ListItemImage src={avatarImage} alt={`"${title || ""}" avatar`} />
        {contents}
      </ListItemWrapper>
    );
  }
}

export default ProjectsListItem;
