import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import Rodape from '~/components/Rodape';

import { Wrapper } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      {children}
      <Rodape />
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
