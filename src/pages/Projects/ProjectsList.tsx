import React, { Component } from "react";

import { css } from "styled-components";
import { List, Record } from "immutable";

const borderColor = "#E6E6E6";

import { DraggableList, Container } from "../../components";
import { Project } from "./Project";

import ProjectsDeletionModal from "./ProjectsDeletionModal";
import ProjectsListItem from "./ProjectsListItem";

// The CSS styles for the draggable list
const listStyle = css`
  border-bottom: 1px solid ${borderColor};
`;

// The CSS styles for each draggable list row
const listItemStyle = css`
  background: #fff;
  border-top: 1px solid ${borderColor};
`;

type Props = {
  // The list of project records to display
  projects: List<Record<Project>>;

  // Called when the order of the list items changes
  // via drag-and-drop
  updateOrder: (newOrder: List<Record<Project>>) => void;

  // Called when a project has been saved
  // via the enter key
  savedProject: (project: Record<Project>) => void;

  // Called when a project's edit state has been
  // enabled via pressing the "Edit" icon
  editProject: (project: Record<Project>) => void;

  // Called when a project has been deleted via
  // the "Delete" icon
  deleteProject: (project: Record<Project>) => void;

  // Called when editing has been cancelled
  // (i.e. the edit box loses focus)
  cancelledEditing: () => void;
};

type State = {
  // A project whose deletion still needs confirmation
  // When the deletion dialog is shown for a project, this value is set
  // When the deletion dialog closes, this value becomes null
  projectPendingDeletion: Record<Project> | null;
};

class ProjectsList extends Component<Props, State> {
  state = {
    projectPendingDeletion: null
  };

  // Holds a reference to the edit box so we
  // can automatically focus it
  editFieldRef: any;

  constructor(props: any) {
    super(props);

    this.editFieldRef = React.createRef();

    this.setProjectPendingDeletion = this.setProjectPendingDeletion.bind(this);
    this.renderProject = this.renderProject.bind(this);
    this.clearProjectionPendingDeletion = this.clearProjectionPendingDeletion.bind(
      this
    );
  }

  /**
   * Wrapper for the `deleteProject` prop &
   * callback for the "Yes" button on the deletion modal
   *
   * @param project Project whose deletion to trigger
   * @returns A function to act as the callback
   */
  deleteProject = (project: Record<Project> | null) => () => {
    if (project !== null) {
      this.props.deleteProject(project);
      this.setProjectPendingDeletion(null);
    }
  };

  /**
   * Returns a callback that sets the active project pending deletion
   * Whether this project is set or not determines whether the deletion modal
   * is visible
   *
   * @param project The project whose deletion should be pending
   */
  setProjectPendingDeletion(project: Record<Project> | null) {
    this.setState({
      projectPendingDeletion: project
    });
  }

  /**
   * Renders a project row
   *
   * @param project The project record to render
   */
  renderProject(project: Record<Project>) {
    const { editProject, savedProject, cancelledEditing } = this.props;

    return (
      <ProjectsListItem
        editFieldRef={this.editFieldRef}
        onDeletePressed={this.setProjectPendingDeletion}
        onEditPressed={editProject}
        onEditingCancelled={cancelledEditing}
        onSave={savedProject}
        project={project}
      />
    );
  }

  /**
   * Called when the component updates
   * Used to focus the edit input box when a new project is created
   */
  componentDidUpdate() {
    if (this.editFieldRef.current) {
      this.editFieldRef.current.focus();
    }
  }

  /**
   * Clears the active project pending deletion (sets it to null),
   * thus closing the deletion confirmation modal
   */
  clearProjectionPendingDeletion() {
    this.setProjectPendingDeletion(null);
  }

  render() {
    const { projects, updateOrder } = this.props;
    const { projectPendingDeletion } = this.state;

    return (
      <Container>
        <ProjectsDeletionModal
          visible={projectPendingDeletion !== null}
          onConfirm={this.deleteProject(projectPendingDeletion)}
          onCancel={this.clearProjectionPendingDeletion}
        />

        <DraggableList
          items={projects}
          dragCompleted={updateOrder}
          renderItemContent={this.renderProject}
          itemStyle={listItemStyle}
          listStyle={projects.size > 0 ? listStyle : null}
        />
      </Container>
    );
  }
}

export default ProjectsList;
