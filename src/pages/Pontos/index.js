import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';

import { Container, Barra, ListaPontos, Banner } from './styles';

export default function Pontos() {
  const [pontos, setPontos] = useState([]);

  useEffect(() => {
    async function loadPontos() {
      const response = await api.get('pontos');

      console.log(response.data);

      setPontos(response.data);
    }

    loadPontos();
  }, []);

  return (
    <Container>
      <Banner />
      <Barra>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/pontos">Pontos</Link>
          </li>
        </ul>
      </Barra>
      <ListaPontos>
        {pontos.map((p) => (
          <li key={p.id}>
            <Link to={`pontos/${p.id}`}>
              <img src={p.imagem.url} alt={p.cidade} />
            </Link>
            <strong>
              {p.rua}, {p.numero} - {p.bairro} - {p.cidade}/{p.uf}
            </strong>
            <Link to={`pontos/${p.id}`}>
              <div>
                <MdAdd size={16} color="#FFF" />
              </div>
              <span>Informações</span>
            </Link>
          </li>
        ))}
      </ListaPontos>
    </Container>
  );
}
