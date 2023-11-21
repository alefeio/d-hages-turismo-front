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
            <Link to="/">Home</Link>
          </li>
          <li>/</li>
          <li>
            Admin Roteiros
          </li>
        </ul>
      </Barra>
      <section>
        <h2>Administrar Site</h2>
      </section>
    </Container>
  );
}
