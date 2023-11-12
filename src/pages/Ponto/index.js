import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import { Container, Barra, Banner, Prod } from './styles';

export default function Ponto(props) {
  const [ponto, setPonto] = useState({});
  const [imagem, setImagem] = useState();

  const id = props.match.params.id;

  useEffect(() => {
    async function loadPonto() {
      const response = await api.get(`pontos/${id}`);

      console.log(response.data);
      setPonto(response.data);
      setImagem(response.data.imagem.url);
    }

    loadPonto();
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
          <li>/</li>
          <li>Loja {ponto.bairro}</li>
        </ul>
      </Barra>
      <Prod>
        <div>
          <img src={imagem} alt="Produto" />
        </div>
        <div>
          <span>
            <h1>Loja {ponto.bairro}</h1>
            <h3>Local</h3>
            <p>
              {ponto.rua}, {ponto.numero} - {ponto.bairro} - {ponto.cidade}/
              {ponto.uf} - CEP: {ponto.cep}
            </p>
            <p>{ponto.complemento}</p>
          </span>
          <ul>
            <li>
              <h3>Contato</h3>
            </li>
            <li>
              <strong>E-mail:</strong> {ponto.email}
            </li>
            <li>
              <strong>Telefone:</strong> {ponto.telefone}
            </li>
            <li>
              <a href={ponto.mapa} target="_blank">
                Ver mapa
              </a>
            </li>
          </ul>
        </div>
      </Prod>
    </Container>
  );
}
