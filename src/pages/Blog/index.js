import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';

import { Container, ListaProdutos, Submenu } from './styles';

export default function Compraevenda() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function loadProdutos() {
      const response = await api.get('blog');

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
            <Link to={`blog/${p.id}`}>
              <h2>{p.titulo}</h2>
              <span>
                Por {p.autor} em {p.created_at}
              </span>
            </Link>
            <Link to={`produtos/${p.id}`}>
              <img src={p.imagem.url} alt={p.nome} />
              <span>
                {p.descricao}
              </span>
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
      <Submenu>
        <h4>Arquivo</h4>
        <ul>
          <li>
            <Link to="/">Março</Link>
          </li>
          <li>
            <Link to="/">Fevereiro</Link>
          </li>
          <li>
            <Link to="/">Janeiro</Link>
          </li>
          <li>
            <Link to="/">Dezembro</Link>
          </li>
        </ul>
      </Submenu>
    </Container>
  );
}
