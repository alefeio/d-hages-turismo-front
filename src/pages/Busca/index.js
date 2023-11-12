import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';

import { Container, Barra, ListaProdutos, Banner } from './styles';

export default function Busca(props) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function loadProdutos() {
      const response = await api.get('busca', { busca: 'moedor' });

      setProdutos(response.data);
    }

    loadProdutos();
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
            <Link to="/busca">Buscar produto</Link>
          </li>
        </ul>
      </Barra>
      <ListaProdutos>
        {produtos.map((p) => (
          <li key={p.id}>
            <img src={p.imagem.url} alt={p.nome} />
            <strong>{p.nome}</strong>
            <Link to={`produtos/${p.id}`}>
              <div>
                <MdAdd size={16} color="#FFF" />
              </div>
              <span>Informações</span>
            </Link>
          </li>
        ))}
      </ListaProdutos>
    </Container>
  );
}
