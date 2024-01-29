import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';

import { Container, Barra, ListaPontos, Banner } from './styles';

export default function Contatoforms({ arquivadas }) {
  const [contatos, setContatos] = useState([]);
  const [dominio, setDominio] = useState('');

  async function loadContatos() {
    const response = await api.get(!arquivadas ? `contato?client=${dominio}` : `contatolidas?client=${dominio}`);

    console.log(response.data);

    setContatos(response.data);
  }

  async function arquivarContato(id) {
    const response = await api.delete(`contato/${id}`);

    loadContatos();
  }

  useEffect(() => {
    loadContatos();
  }, [arquivadas, dominio]);

  useEffect(() => {
    // Extrair o domínio automaticamente da URL da página
    const extrairDominioDaURLAtual = () => {
      try {
        const urlObj = new URL(window.location.href);
        setDominio(urlObj.hostname.split('.')[0]);
      } catch (error) {
        console.error('Erro ao extrair o domínio da URL atual');
        setDominio('');
      }
    };

    // Chamar a função ao montar o componente
    extrairDominioDaURLAtual();
  }, []);

  return (
    <Container>
      <ListaPontos>
        {contatos.map((c) => (
          <>
            <li key={c.id}>
              <strong>Nome:</strong> {c.nome} <br />
              <strong>Email:</strong>
              {c.email}
              <br />
              <a href={`mailto:${c.email}?bcc=dhagesturismo@gmail.com&subject=D' Hages Turismo - ${c.assunto}&body=Resposta ao seu contato no site D' Hages Turismo. Assunto: ${c.assunto}. Mensagem: ${c.mensagem}`}>Responder e-mail</a>
              {c.telefone &&
                <>
                  <br />
                  <strong>Telefone:</strong>
                  {c.telefone}
                  <br />
                  <a href={`https://wa.me//55${c.telefone.length === 11 ? c.telefone : `91${c.telefone}`}?text=Resposta ao seu contato no site D' Hages Turismo. Assunto: ${c.assunto}. Mensagem: ${c.mensagem}`} target='_blank'>
                    Responder WhatsApp
                  </a>
                </>}
              <br />
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
