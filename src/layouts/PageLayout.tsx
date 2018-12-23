import React from "react";

import { Layout as AntLayout } from "antd";

import styled from "styled-components";

import { Container } from "../components";

import logoImage from "../images/logo.png";

const { Header: AntHeader, Content: AntContent } = AntLayout;

const Header = styled(AntHeader)`
  margin-bottom: 3rem;
`;

const HeaderLogo = styled.img`
  width: 2rem;
  height: 2rem;
`;

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export const PageLayout = ({ children }: Props) => (
  <AntLayout>
    <Header>
      <Container>
        <HeaderLogo src={logoImage} alt="Logo" />
      </Container>
    </Header>
    <AntContent>{children}</AntContent>
  </AntLayout>
);
