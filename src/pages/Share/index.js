import React from 'react';
import { Link } from 'react-router-dom';

import colaborador from '~/assets/colaborador.png';

import { Container } from './styles';
import { Helmet } from 'react-helmet';

export default function Share() {
  return (
    <>
      <Helmet>
        <meta property="og:site_name" content="tafechado.org.br" />
        <meta property="og:title" content="Tá Fechado" />
        <meta property="og:description" content="Junte-se ao Tá Fechado!" />
        <meta property="og:image:secure_url" itemprop="image" content={`https://tafechado.org.br/static/media/colaborador.b15a6368.png`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <Container>
        <img src={colaborador} />
      </Container>
    </>
  );
}
