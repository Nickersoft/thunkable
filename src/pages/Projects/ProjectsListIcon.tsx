import React from "react";

import { Icon } from "antd";

import styled from "styled-components";

import { ReactComponent as editIcon } from "../../images/icon-edit.svg";
import { ReactComponent as deleteIcon } from "../../images/icon-delete.svg";

type listIconWrapperProps = {
  hoverOpacity: number;
  opacity: number;
};

// A DIV used to wrap the edit and delete icons on each row
// These rules could not be applied to the <Icon> component directly,
// as the custom opacity props conflicted with its props
const ListIconWrapper = styled.div<listIconWrapperProps>`
  opacity: ${({ opacity }) => opacity};
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: ${({ hoverOpacity }) => hoverOpacity};
  }

  @media (max-width: 850px) {
    margin-right: 1rem;

    &:last-child {
      margin: 0;
    }
  }
`;

// The styled Ant Design <Icon> component
const ListIcon = styled(Icon)`
  color: #000;
  font-size: 1.5rem;
  cursor: pointer;
`;

type Props = {
  onClick: () => void;
};

type MasterProps = Props & {
  opacity: number;
  hoverOpacity: number;
  component: any;
};

const ProjectsListIcon = ({
  onClick,
  opacity,
  hoverOpacity,
  component
}: MasterProps) => (
  <ListIconWrapper opacity={opacity} hoverOpacity={hoverOpacity}>
    <ListIcon onClick={onClick} component={component} />
  </ListIconWrapper>
);

export default {
  Edit: ({ onClick }: Props) =>
    ProjectsListIcon({
      onClick,
      opacity: 0.5,
      hoverOpacity: 0.9,
      component: editIcon
    }),
  Delete: ({ onClick }: Props) =>
    ProjectsListIcon({
      onClick,
      opacity: 0.3,
      hoverOpacity: 0.6,
      component: deleteIcon
    })
};
