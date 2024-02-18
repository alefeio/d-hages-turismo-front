import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';
import SiteContext from '~/context/site';

export default function AuthLayout({ children }) {
  const [dominio, setDominio] = useState('');

  const { state } = useContext(SiteContext);

  useEffect(() => {
    // Chamar a função ao montar o componente
    !dominio && setDominio(extrairDominioDaURLAtual());
  }, [dominio]);

  return (
    <Wrapper state={state}>
      <Content>{children}</Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
