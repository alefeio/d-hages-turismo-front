import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Container, Barra, ListaPontos, Banner } from './styles';

export default function Contatoforms({ arquivadas }) {
  const [contatos, setContatos] = useState([]);

  async function loadContatos() {
    const response = await api.get(!arquivadas ? 'contato' : 'contatolidas');

    console.log(response.data);

    setContatos(response.data);
  }

  async function arquivarContato(id) {
    const response = await api.delete(`contato/${id}`);

    loadContatos();
  }

  useEffect(() => {
    loadContatos();
  }, [arquivadas]);

  return (
    <Container>
      <ListaPontos>
        {contatos.map((c) => (
          <>
            <li key={c.id}>
              <strong>Nome:</strong> {c.nome} <br />
              <strong>Email:</strong> {c.email} <br />
              <strong>Telefone:</strong> {c.telefone} <br />
              <strong>Assunto:</strong> {c.assunto} <br />
              <strong>Mensagem:</strong> {c.mensagem} <br />
              <strong>Data:</strong> {c.createdAt && c.createdAt.split('T')[0].split('-').reverse().join('/')} {c.createdAt && `${c.createdAt.split('T')[1].split(':')[0] === '00' ? '21' : c.createdAt.split('T')[1].split(':')[0] === '01' ? '22' : c.createdAt.split('T')[1].split(':')[0] === '02' ? '23' : String(c.createdAt.split('T')[1].split(':')[0] - 3)}:${String(c.createdAt.split('T')[1].split(':')[1])}`}
              {!arquivadas && <button onClick={() => arquivarContato(c.id)}>Arquivar</button>}
            </li>
          </>
        ))}
      </ListaPontos>
    </Container>
  );
}
