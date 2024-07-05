import React, { useEffect, useState } from 'react';

import { Container, Banner, Barra } from './styles';
import Contatoforms from '../Contatoforms';
import MenuDash from '~/components/MenuDash';
import { Link } from 'react-router-dom';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';
import { useSelector } from 'react-redux';
import FormEleicoes from './FormEleicoes';

export default function Dashboard() {
  const [arquivadas, setArquivadas] = useState(false);
  const [dominio, setDominio] = useState('');

  const perfil = useSelector((state) => state.usuario.perfil);

  useEffect(() => {
    // Chamar a função ao montar o componente
    setDominio(extrairDominioDaURLAtual());
  }, []);

  return (
    <Container>
      {dominio === 'dhagesturismo' && (
        <Banner />
      )}
      <Barra>
        {/* <ul>
          <li>
            Dashboard
          </li>
        </ul> */}
      </Barra>
      <section>
        <MenuDash />
        {perfil.admin && <div>
          {dominio === 'tafechado' && <FormEleicoes />}
          <div>
            <h2>Mensagens do Site</h2>
            <small>
              <Link onClick={() => setArquivadas(!arquivadas)}>
                {!arquivadas ? 'Ver arquivadas' : 'Ver ativas'}
              </Link>
            </small>
          </div>
          <Contatoforms arquivadas={arquivadas} />
        </div>}
      </section>
    </Container>
  );
}
