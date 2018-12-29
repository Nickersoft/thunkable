import React, { Component } from "react";

import { List, Record, Seq } from "immutable";

import { PageLayout } from "../../layouts";
import { Project } from "./Project";

import ProjectsList from "./ProjectsList";
import ProjectsHeader from "./ProjectsHeader";

// Returns a Record factory that creates
// project records using a map of default values
const makeProject = Record({
  id: -1,
  title: "",
  lastModified: new Date(),
  isCreating: true,
  isEditing: false
});

// Component Props (there are none)
type Props = {};

type State = {
  // The persistent list of projects
  projects: List<Record<Project>>;
};

/**
 * Retrieves and parses serialized project records
 * from local storage
 *
 * @returns A list of retrieve project records, or an empty list if none can be found
 */
const getProjects = (): List<Record<Project>> => {
  const projects = localStorage.getItem("projects");

  if (projects !== null) {
    return Seq(JSON.parse(projects))
      .map((x: Project) => makeProject(x))
      .map((x: Record<Project>) => x.update("lastModified", x => new Date(x)))
      .toList();
  }

  return List();
};

// The initially retrieved projects
const initialProjects = getProjects();

// Retrieve the last project to update the index counter
const latestProject: Record<Project> = initialProjects.last();

// A persistent index counter to keep track of project IDs
// to ensure they're always unique
let projectIndex = latestProject ? latestProject.get("id") + 1 : 0;

/**
 * Saved a list of project records to local storage
 *
 * @param projects The list of project records to save
 */
const saveProjects = (projects: List<Record<Project>>) => {
  localStorage.setItem("projects", JSON.stringify(projects.toJSON()));
};

export class Projects extends Component<Props, State> {
  state = {
    projects: initialProjects
  };

  constructor(props: any) {
    super(props);

    this.addProject = this.addProject.bind(this);
    this.cancelAllEditing = this.cancelAllEditing.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.editProject = this.editProject.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.updateProjectOrder = this.updateProjectOrder.bind(this);
  }

  /**
   * Updates the order of the projects after they have
   * been rearranged via drag-and-drop
   *
   * @param newOrder The updated list of project records
   */
  updateProjectOrder(newOrder: List<Record<Project>>) {
    this.setState({
      projects: newOrder
    });
  }

  /**
   * Adds a new project using a generated ID
   * and an empty title
   */
  addProject() {
    const { projects }: State = this.state;

    this.setState({
      projects: projects.push(makeProject({ id: projectIndex, title: "" }))
    });

    projectIndex++;
  }

  /**
   * Called when the component has updated due to state change
   * This is used to save project state occassionally
   */
  componentDidUpdate() {
    saveProjects(this.state.projects);
  }

  /**
   * Deletes a project by filtering it out of the project state
   *
   * @param project The project record to delete
   */

  deleteProject(project: Record<Project>) {
    const { projects }: State = this.state;

    this.setState({
      projects: projects.filter(x => x.get("id") !== project.get("id"))
    });
  }

  /**
   * Saves a project to the global project state by removing its
   * creation and editing toggles
   *
   * @param project The project record to save
   */
  saveProject(project: Record<Project>) {
    const { projects }: State = this.state;

    if (project.get("title").trim().length > 0) {
      this.setState({
        projects: projects.update(
          projects.findIndex(x => x.get("id") === project.get("id")),
          () => project.set("isCreating", false).set("isEditing", false)
        )
      });
    }
  }

  /**
   * Updates a project using its ID
   *
   * @param project The updated project
   */
  editProject(project: Record<Project>) {
    const { projects } = this.state;

    this.setState({
      projects: projects.update(
        projects.findIndex(x => x.get("id") === project.get("id")),
        project =>
          project.set("isEditing", true).set("lastModified", new Date())
      )
    });
  }

  /**
   * Cancels editing for every row item.
   * Ideally, this should only ever happen one row at a time,
   * seeing blurring the edit input box cancels all editing anyway.
   */
  cancelAllEditing() {
    const { projects }: State = this.state;

    const cancelledProjects = projects
      .toSeq() // convert to a sequence so we don't create intermediate arrays
      .filter(p => !p.get("isCreating"))
      .map(p => p.set("isEditing", false))
      .toList();

    this.setState({
      projects: cancelledProjects
    });
  }

  render() {
    const { projects } = this.state;
    return (
      <PageLayout>
        <ProjectsHeader addProject={this.addProject} />
        <ProjectsList
          projects={projects}
          editProject={this.editProject}
          deleteProject={this.deleteProject}
          cancelledEditing={this.cancelAllEditing}
          savedProject={this.saveProject}
          updateOrder={this.updateProjectOrder}
        />
      </PageLayout>
    );
  }
}
