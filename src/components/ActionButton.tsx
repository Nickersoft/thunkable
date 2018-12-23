import React from "react";

import { Button as AntButton } from "antd";

import styled from "styled-components";

const Button = styled(AntButton)`
  background: #4a475f !important; /* required to override primary button default */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  font-size: 20px; /* slightly larger than 18px to compensate for edge-to-edge space */
`;

type Props = {
  icon: string;
  onClick: () => void;
};

export const ActionButton = ({ icon, onClick }: Props) => (
  // There seems to be some issues with SC + TS, so we'll ignore this line for now.
  // https://github.com/styled-components/styled-components/issues/1428
  // @ts-ignore
  <Button shape="circle" type="primary" onClick={onClick} icon={icon} />
);
