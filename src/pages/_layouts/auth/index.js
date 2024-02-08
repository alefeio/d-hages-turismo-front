import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';

export default function AuthLayout({ children }) {
  const [dominio, setDominio] = useState('');

  useEffect(() => {
    // Chamar a função ao montar o componente
    !dominio && setDominio(extrairDominioDaURLAtual());
  }, [dominio]);

  return (
    <Wrapper client={dominio}>
      <Content>{children}</Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
