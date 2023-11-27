import React, { useState } from 'react';

import { Container, Banner, Barra } from './styles';
import Contatoforms from '../Contatoforms';
import MenuDash from '~/components/MenuDash';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [arquivadas, setArquivadas] = useState(false);

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
          <div>
            <h2>Mensagens do Site</h2>
            <small>
              <Link onClick={() => setArquivadas(!arquivadas)}>
                {!arquivadas ? 'Ver arquivadas' : 'Ver ativas'}
              </Link>
            </small>
          </div>
          <Contatoforms arquivadas={arquivadas} />
        </div>
      </section>
    </Container>
  );
}
