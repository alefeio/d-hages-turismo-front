import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Container, Barra, ListaPontos, Banner } from './styles';

export default function Contatoforms() {
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    async function loadContatos() {
      const response = await api.get('contato');

      console.log(response.data);

      setContatos(response.data);
    }

    loadContatos();
  }, []);

  return (
    <Container>
      <Banner />
      <Barra>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/pontos">Mensagens de contato</Link>
          </li>
        </ul>
      </Barra>
      <ListaPontos>
        {contatos.map((c) => (
          <li key={c.id}>
            <strong>Nome:</strong> {c.nome} <br />
            <strong>Email:</strong> {c.email} <br />
            <strong>Telefone:</strong> {c.telefone} <br />
            <strong>Assunto:</strong> {c.assunto} <br />
            <strong>Mensagem:</strong> {c.mensagem} <br />
            <strong>Data:</strong> {c.created_at.split('T')[0].split('-').reverse().join('/')} {`${c.created_at.split('T')[1].split(':')[0] === '00' ? '21' : c.created_at.split('T')[1].split(':')[0] === '01' ? '22' : c.created_at.split('T')[1].split(':')[0] === '02' ? '23' : String(c.created_at.split('T')[1].split(':')[0] - 3)}:${String(c.created_at.split('T')[1].split(':')[1])}`}
          </li>
        ))}
      </ListaPontos>
    </Container>
  );
}
