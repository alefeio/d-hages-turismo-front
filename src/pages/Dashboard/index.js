import React from 'react';

import { Container, Banner, Barra } from './styles';
import Contatoforms from '../Contatoforms';
import MenuDash from '~/components/MenuDash';

export default function Dashboard() {
  return (
    <Container>
      <Banner />
      <Barra>
        <ul>
          <li>
            Dashboard
          </li>
        </ul>
      </Barra>
      <section>
        <MenuDash />
        <div>
          <h2>Mensagens do Site</h2>
          <Contatoforms />
        </div>
      </section>
    </Container>
  );
}
