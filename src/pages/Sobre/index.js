import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Barra, Banner } from './styles';

// import f02 from '~/assets/home/02.jpg';
import f03 from '~/assets/home/03.jpg';
import f04 from '~/assets/home/04.jpg';
import f05 from '~/assets/home/05.jpg';

export default function Sobre() {
  return (
    <Container>
      <Banner>
        {/* <img src={f02} alt="Banner" /> */}
        <img src={f03} alt="Banner" />
        <img src={f04} alt="Banner" />
        <img src={f05} alt="Banner" />
      </Banner>
    </Container>
  );
}
