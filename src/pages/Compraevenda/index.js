import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';

import { Container, ListaProdutos } from './styles';

export default function Compraevenda() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function loadProdutos() {
      const response = await api.get('compraevenda');

      console.log(`data: ${response.data}`);

      setProdutos(response.data);
    }

    loadProdutos();
  }, []);

  return (
    <Container>
      {/* <Banner />
      <Barra>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/produtos">Produtos</Link>
          </li>
        </ul>
      </Barra> */}
      <ListaProdutos>
        {produtos.map((p) => (
          <li key={p.id}>
            <Link to={`produtos/${p.id}`}>
              <img src={p.imagem.url} alt={p.nome} />
            </Link>
            <Link to={`produtos/${p.id}`}>
              <strong>
                {p.nome} <br />
                {p.modelo} <br />
                {p.valor}
              </strong>
            </Link>
            {/* <Link to={`produtos/${p.id}`}>
              <div>
                <MdAdd size={16} color="#FFF" />
              </div>
              <span>Informações</span>
            </Link> */}
          </li>
        ))}
      </ListaProdutos>
    </Container>
  );
}
