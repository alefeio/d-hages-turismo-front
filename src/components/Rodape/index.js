import React, { useContext, useEffect, useState } from 'react';

import icoinsta from '~/assets/ico-insta.png';
import icoface from '~/assets/ico-face.png';
import { Form, Input, Textarea } from '@rocketseat/unform';

import { store } from '~/store';

import { Rod, Trabalhe, Container } from './styles';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';

import api from '~/services/api';
import { toast } from 'react-toastify';

import * as Yup from 'yup';
import SiteContext from '~/context/site';

import deusa from '~/assets/deusa-justica.png';

const schema = Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório!'),
  telefone: Yup.string().required('Campo obrigatório!'),
  email: Yup.string().email('E-mail inválido!').required('Campo obrigatório!'),
  assunto: Yup.string(),
  mensagem: Yup.string().required('Campo obrigatório!'),
});

export default function Rodape() {
  const { logado } = store.getState().auth;
  const [dominio, setDominio] = useState('');
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [sendNews, setSendNews] = useState(false);

  const { state } = useContext(SiteContext);

  async function handleSubmit(data = {}) {
    console.log('data', data);

    setLoading(true);
    try {
      await api.post('contato', {
        nome: data.nome ? data.nome : "lead",
        email: data.email ? data.email : email,
        telefone: data.telefone ? data.telefone : "",
        assunto: data.assunto ? data.assunto : "Newsletter",
        mensagem: data.mensagem ? data.mensagem : dominio === 'dhagesturismo' ? "Acompanhar as novidades sobre os roteiros da D' Hages" : '',
        client: dominio
      });

      toast.success(
        'Seu email foi cadastrado com sucesso. Em breve retornaremos.'
      );

      data.nome ? setEnviado(true) : setSendNews(true);

      setEmail('');
    } catch (error) {
      toast.error('Erro ao cadastrar seu email. Tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Chamar a função ao montar o componente
    setDominio(extrairDominioDaURLAtual());
  }, []);

  return (
    <Container>
      <Trabalhe id="contato" state={state} client={dominio} bg={deusa}>
        <div>
          <h2>{state?.rodape_titulo}</h2>
          <div dangerouslySetInnerHTML={{ __html: state?.rodape_texto }}></div>
          <section>
            <a href={state?.instagram} target="_blank">
              <img src={icoinsta} alt="Instagram" />
            </a>
            <a href={state?.facebook} target="_blank">
              <img src={icoface} alt="Facebook" />
            </a>
          </section>
        </div>
        {!enviado ? (
          <Form schema={schema} onSubmit={handleSubmit}>
            <Input name="nome" placeholder="Nome" />
            <Input name="telefone" placeholder="Telefone" />
            <Input name="email" type="email" placeholder="E-mail" />
            <Input name="assunto" placeholder="Assunto" />
            <Textarea name="mensagem" placeholder="Sua mensagem" />

            <button disabled={loading} type="submit">Enviar</button>
          </Form>
        ) : (
          <div>
            <h2>Sua mensagem foi enviada com sucesso!</h2>
            <p>Em breve nossa equipe entrará em contato.</p>
          </div>
        )
        }
        {/* <img src={logo} alt="Logo HCS" /> */}
      </Trabalhe>
      <Rod state={state}>
        <ul>
          <li>
            <a href={state?.instagram} target="_blank">
              <img src={icoinsta} alt="Instagram" />
            </a>
            <a href={state?.facebook} target="_blank">
              <img src={icoface} alt="Facebook" />
            </a>
          </li>
        </ul>
      </Rod>
    </Container>
  );
}
