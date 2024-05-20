import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { logout } from '~/store/modules/auth/actions';
import { updatePerfilRequest } from '~/store/modules/usuario/actions';

import copy from '~/assets/copy.png';

// import AvatarInput from './AvatarInput';

import { Container, Banner, Barra, Img } from './styles';
import { Link } from 'react-router-dom';

export default function Perfil() {
  const dispatch = useDispatch();
  const perfil = useSelector((state) => state.usuario.perfil);

  const [admin, setAdmin] = useState(perfil.admin);

  console.log('perfil', perfil)


  function handleSubmit(data) {
    data.admin = admin;

    console.log('data', data)
    data.admin === true || data.admin === false && dispatch(updatePerfilRequest(data));
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.href.split('//')[1].split('/')[0]}?email=${perfil.email}`);
      console.log('Texto copiado para a área de transferência');
    } catch (err) {
      console.log('Falha ao copiar o texto', err);
    }
  };

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
            Meu perfil
          </li>
        </ul>
      </Barra>
      <section>
        <Form initialData={perfil} onSubmit={handleSubmit}>
          {/* <AvatarInput name="img_id" /> */}

          <Input name="nome" placeholder="Nome" />
          <Input name="email" type="email" placeholder="E-mail" disabled />
          Link para indicação
          <div>
            <Input name="codigo" id="text" type="email" placeholder="E-mail" value={`${window.location.href.split('//')[1].split('/')[0]}?email=${perfil.email}`} disabled />
            <Img src={copy} alt="Copiar link de indicação" onClick={copyToClipboard} />
          </div>

          {/* <Input type='radio' name="admin" onChange={() => setAdmin(true)} checked={!!admin} /> Sim
          <Input type='radio' name="admin" onChange={() => setAdmin(false)} checked={!admin} /> Não */}

          <hr />

          <Input
            type="password"
            name="oldPassword"
            placeholder="Sua senha atual"
          />
          <Input type="password" name="password" placeholder="Nova senha" />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirmação da senha"
          />

          <button type="submit">Atualizar perfil</button>
        </Form>
      </section>
    </Container>
  );
}
