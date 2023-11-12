import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.png';

import { cadastroRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório!'),
  email: Yup.string().email('E=mail inválido!').required('Campo obrigatório!'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres.')
    .required('Campo obrigatório!'),
});

export default function Cadastro() {
  const dispatch = useDispatch();

  function handleSubmit({ nome, email, password }) {
    dispatch(cadastroRequest(nome, email, password));
  }

  return (
    <>
      <img src={logo} alt="Brazilian Black Pepper" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="nome" placeholder="Seu nome" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <button type="submit">Criar conta</button>
        <Link to="/login">Já tenho conta</Link>
        <Link to="/">Ir para o site</Link>
      </Form>
    </>
  );
}
