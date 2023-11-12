import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '~/services/api';

import contato from '~/assets/pgcontato.jpg';

import { Container, Barra, Banner, Prod, Contact } from './styles';

const schema = Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório!'),
  email: Yup.string().email('E-mail inválido!').required('Campo obrigatório!'),
  telefone: Yup.string().required('Campo obrigatório!'),
  assunto: Yup.string(),
  mensagem: Yup.string().required('Campo obrigatório!'),
});

export default function Contato() {
  async function handleSubmit({ nome, email, telefone, assunto, mensagem }) {
    try {
      await api.post('contato', {
        nome,
        email,
        telefone,
        assunto,
        mensagem,
      });

      toast.success(
        'Obrigado! Sua mensagem foi enviada com sucesso. Em breve retornaremos.'
      );
    } catch (error) {
      toast.error('Erro ao enviar sua mensagem. Tente novamente!');
    }
  }

  return (
    <Container>
      {/* <Banner /> */}
      {/* <Barra>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/contato">Contato</Link>
          </li>
        </ul>
      </Barra> */}
      <Prod>
        <div>
          <img src={contato} alt="Produto" />
        </div>
        <div>
          <Contact>
            <h2>
              Alta performance para uso executivo, isso é a HCS. Preparados para
              voar?
            </h2>
            <p>
              Envie uma mensagem para nós. Sua opinião, crítica ou elogio é
              muito importante para o nosso sucesso. Ou fale conosco no
              WhatsApp: (11) 99109-8715.
            </p>
            <Form schema={schema} onSubmit={handleSubmit}>
              <Input name="nome" placeholder="Seu nome" />
              <Input name="email" type="email" placeholder="Seu e-mail" />
              <Input name="telefone" placeholder="Telefone ou celular" />
              <Input name="assunto" placeholder="Assunto" />
              <Textarea name="mensagem" placeholder="Sua mensagem" />

              <button type="submit">Enviar</button>
            </Form>
          </Contact>
        </div>
      </Prod>
    </Container>
  );
}
