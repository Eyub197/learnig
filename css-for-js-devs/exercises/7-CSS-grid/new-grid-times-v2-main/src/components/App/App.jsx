import React from 'react';

import Header from '../Header';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Footer from '../Footer';
import Spacer from '../Spacer';
import MainStoryGrid from '../MainStoryGrid';
import SpecialtyStoryGrid from '../SpecialtyStoryGrid';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../constants';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <MaxWidthWrapper as="main">
        <MainStoryGrid />
        <SpecialtyStoryGrid />
      </MaxWidthWrapper>
      <Spacer size={64} />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
