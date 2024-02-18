import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { loginRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';
import logoIopa from '~/assets/logo-iopa.png';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';
import SiteContext from '~/context/site';

const schema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido!').required('Campo obrigatório!'),
  password: Yup.string().required('Campo obrigatório!'),
});

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [dominio, setDominio] = useState('');

  const { state } = useContext(SiteContext);

  function handleSubmit({ email, password }) {
    dispatch(loginRequest(email, password));
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
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
        <Link to="/">Ir para o site</Link>
      </Form>
    </>
  );
}
