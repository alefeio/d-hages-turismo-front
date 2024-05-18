import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { cadastroRequest } from '~/store/modules/auth/actions';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';
import SiteContext from '~/context/site';

const schema = Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório!'),
  email: Yup.string().email('E=mail inválido!').required('Campo obrigatório!'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres.')
    .required('Campo obrigatório!'),
  admin: Yup.boolean(),
  codigo_up: Yup.string().email('E=mail inválido!').required('Campo obrigatório!')
});

export default function Cadastro() {
  const dispatch = useDispatch();
  const [dominio, setDominio] = useState('');

  const { state } = useContext(SiteContext);

  function handleSubmit({ nome, email, password, admin, client, codigo_up }) {
    dispatch(cadastroRequest(nome, email, password, admin, codigo_up, client));
  }

  useEffect(() => {
    // Chamar a função ao montar o componente
    setDominio(extrairDominioDaURLAtual());
  }, []);

  return (
    <>

      <Form schema={schema} onSubmit={handleSubmit}>
      <img src={state?.logo?.url} alt={state?.nome} />
        <br />
        <Input name="nome" placeholder="Seu nome" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <Input name="admin" type="hidden" value={false} />
        <Input name="client" type="hidden" value={dominio} />
        <Input name="codigo_up" type="email" placeholder="Código do coordenador" />
        <button type="submit">Criar conta</button>
        <Link to="/login">Ir para o Login</Link>
      </Form>
    </>
  );
}
