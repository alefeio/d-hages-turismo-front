import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Barra, Banner } from './styles';

import f06 from '~/assets/home/06.jpg';
import f08 from '~/assets/home/08.jpg';

export default function Taxiaereo() {
  return (
    <Container>
      <Banner>
        <img src={f06} alt="Banner" />
        <img src={f08} alt="Banner" />
      </Banner>
    </Container>
  );
}
