import React from "react";

import { Divider as AntDivider } from "antd";

import styled from "styled-components";

import { Container, Heading, ActionButton } from "../../components";

const Divider = styled(AntDivider)`
  /* -100% minus half the height of the action button */
  transform: translateY(calc(-100% + (3.75rem / 2)));
`;

type Props = {
  // Callback for creating new projects
  addProject: () => void;
};

export default ({ addProject }: Props) => (
  <>
    <Container>
      <Heading>My Projects</Heading>
    </Container>
    <Divider orientation="right">
      <ActionButton icon="plus" onClick={addProject} />
    </Divider>
  </>
);
