import React, { useState } from 'react';
import { Form, Input } from '@rocketseat/unform';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Container, Banner, Barra } from './styles';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import api from '~/services/api';

export default function Dashboard() {
  return (
    <Container>
      <Banner />
      <Barra>
        <ul>
          <li>
            Dashboard
          </li>
        </ul>
      </Barra>
      <section>
        <h2>Administrar Site</h2>
        <ul>
          <li>
            <Link to="/perfil">
              Meu perfil
            </Link>
          </li>
          <li>
            <Link to="/admin/roteiros">
              Adm Roteiros
            </Link>
          </li>
          <li>
            <Link to="/contatoforms">
              Msgs Contato
            </Link>
          </li>
        </ul>
      </section>
    </Container>
  );
}
