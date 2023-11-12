import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Container, Barra, Banner, Prod } from './styles';

export default function Produto(props) {
  const [produto, setProduto] = useState({});
  const [imagem, setImagem] = useState();
  const [detalhes, setDetalhes] = useState([]);

  const id = props.match.params.id;

  useEffect(() => {
    async function loadProduto() {
      const response = await api.get(`compraevenda/${id}`);

      console.log(response.data);
      setProduto(response.data);
      setImagem(response.data.imagem.url);
    }

    async function loadDetalhes() {
      const response = await api.get(`detalhescv/${id}`);

      console.log(response.data);

      response.data.map((dt) => {
        setDetalhes((det) => [...det, dt]);
      });

      console.log(detalhes);
    }

    loadProduto();
    loadDetalhes();
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
            <Link to="/produtos">Produtos</Link>
          </li>
          <li>/</li>
          <li>{produto && produto.nome}</li>
        </ul>
      </Barra>
      <Prod>
        <div>
          <img src={imagem} alt="Produto" />
        </div>
        <div>
          <span>
            <h1>{produto.nome}</h1>
            <h2>{produto.modelo}</h2>
            <h3>Valor: {produto.valor}</h3>
          </span>
          <ul>
            <li>
              <h3>Detalhes</h3>
            </li>
            {detalhes.map((d, index) => (
              <li key={d.id}>
                <strong>{d.titulo}</strong>
                {d.descricao.split(';').map((des) => (
                  <p>{des}</p>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </Prod>
    </Container>
  );
}
