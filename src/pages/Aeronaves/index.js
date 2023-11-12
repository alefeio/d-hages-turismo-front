import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Banner } from './styles';

import f07 from '~/assets/home/07.jpg';
import f10 from '~/assets/home/10.jpg';
import f11 from '~/assets/home/11.jpg';

export default function Aeronaves() {
  return (
    <Container>
      <Banner>
        <img src={f07} alt="Banner" />
        <img src={f10} alt="Banner" />
        <img src={f11} alt="Banner" />
      </Banner>
    </Container>
  );
}
