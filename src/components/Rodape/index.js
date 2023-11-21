import React from 'react';

import icoinsta from '~/assets/ico-insta.jpg';
import icoface from '~/assets/ico-face.jpg';

import { store } from '~/store';

import { Rod } from './styles';

export default function Rodape() {
  const { logado } = store.getState().auth;

  return (
    <Rod>
      <ul>
        <li>
          <a href="https://instagram.com/dhages_turismo" target="_blank">
            <img src={icoinsta} alt="Instagram" />
          </a>
          <a href="https://facebook.com/dhagesturismo" target="_blank">
            <img src={icoface} alt="Facebook" />
          </a>
        </li>
      </ul>
    </Rod>
  );
}
