import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import api from '~/services/api';

import wpp from '~/assets/wpp.png';

import icoinsta from '~/assets/ico-insta.jpg';
import icoface from '~/assets/ico-face.jpg';

import { Container, Barra, Banner, Prod, Contact, WhatsApp } from './styles';
import { useEffect } from 'react';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';

const schema = Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório!'),
  email: Yup.string().email('E-mail inválido!').required('Campo obrigatório!'),
  telefone: Yup.string().required('Campo obrigatório!'),
  assunto: Yup.string(),
  mensagem: Yup.string().required('Campo obrigatório!'),
});

export default function Contato() {
  const [textWpp, setTextWpp] = useState("Quero viajar com a D' Hages. Estou entrando em contato através do site.");
  const [dominio, setDominio] = useState('');

  async function handleSubmit({ nome, email, telefone, assunto, mensagem }) {
    try {
      await api.post('contato', {
        nome,
        email,
        telefone,
        assunto,
        mensagem,
        client: dominio
      });

      toast.success(
        'Obrigado! Sua mensagem foi enviada com sucesso. Em breve retornaremos.'
      );
    } catch (error) {
      toast.error('Erro ao enviar sua mensagem. Tente novamente!');
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [])

  useEffect(() => {
    // Chamar a função ao montar o componente
    setDominio(extrairDominioDaURLAtual());
  }, []);

  return (
    <Container>
      <WhatsApp>
        <Input name="whatsapp" value={textWpp} onChange={(e) => setTextWpp(e.target.value)} />
        <a href={`https://wa.me//5591981149800?text=${textWpp}`} target='_blank'>
          <img src={wpp} alt="Logo HCS" />
        </a>
      </WhatsApp>
      <Banner />
      <Barra>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>/</li>
          <li>Contatos</li>
        </ul>
      </Barra>
      <Prod>
        <div>
          <Contact>
            <h2>
              Preparado para se aventurar com a D' Hages Turismo?
            </h2>
            <p>
              Envie uma mensagem para nós. Sua opinião, crítica ou elogio é muito importante para o nosso sucesso. Ou fale conosco no <a href={`https://wa.me//5591981149800?text=${textWpp}`} target='_blank'>WhatsApp: (91) 98114-9800</a>.
            </p>
            <section>
              <a href="https://instagram.com/dhages_turismo" target="_blank">
                <img src={icoinsta} alt="Instagram" />
              </a>
              <a href="https://facebook.com/dhagesturismo" target="_blank">
                <img src={icoface} alt="Facebook" />
              </a>
            </section>
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
        <div>
          {/* <img src={contato} alt="Produto" /> */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15954.345782500639!2d-48.4780747!3d-1.4238214!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a48bfd67c896fd%3A0x1200efcf3165952!2sD&#39;%20Hages%20Turismo!5e0!3m2!1spt-BR!2sbr!4v1700398532335!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </Prod>
    </Container>
  );
}
