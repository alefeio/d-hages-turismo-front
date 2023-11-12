import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Container, Barra, Banner, Prod } from './styles';

export default function Receita(props) {
  const [receita, setReceita] = useState({});
  const [imagem, setImagem] = useState();
  const [ingrediente, setIngrediente] = useState([]);
  const [modoPreparo, setModopreparo] = useState([]);

  const { id } = props.match.params;

  function setIngred(data) {
    const ingred = data.split(';');

    setIngrediente(ingred);
  }

  function setMod(data) {
    const modoPrep = data.split(';');

    setModopreparo(modoPrep);
  }

  useEffect(() => {
    async function loadReceita() {
      const response = await api.get(`receitas/${id}`);

      console.log(response.data);

      setReceita(response.data);
      setImagem(response.data.imagem.url);
      setIngred(response.data.ingredientes);
      setMod(response.data.modopreparo);
    }

    loadReceita();
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
            <Link to="/receitas">Receitas</Link>
          </li>
          <li>/</li>
          <li>{receita.titulo}</li>
        </ul>
      </Barra>
      <Prod>
        <div>
          <img src={imagem} alt={receita.titulo} />
        </div>
        <div>
          <span>
            <h1>{receita.titulo}</h1>
          </span>
          <ul>
            <li>
              <strong>Tempo:</strong> {receita.tempo}
            </li>
            <li>
              <strong>Dificuldade:</strong> {receita.dificuldade}
            </li>
            <li>
              <strong>Porções:</strong> {receita.porcoes}
            </li>
            <li>
              <strong>Ingredientes:</strong> <br />
              <ul>
                {ingrediente.map((i) => (
                  <li>{i}</li>
                ))}
              </ul>
            </li>
            <li>
              <strong>Modo de Preparo:</strong>
              <ul>
                {modoPreparo.map((m) => (
                  <li>{m}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </Prod>
    </Container>
  );
}
