import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { About, Contact, Featured, Hero, Projects } from '../components';

const StyledMainContainer = styled.main`
  counter-reset: section;
`;

const IndexPage = () => (
  <Layout>
    <StyledMainContainer className="fillHeight">
      <Hero />
      <About />
      {/* <Jobs /> */}
      <Featured />
      <Projects />
      <Contact />
    </StyledMainContainer>
  </Layout>
);

export default IndexPage;