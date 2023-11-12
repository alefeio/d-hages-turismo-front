import React from 'react';
import { Link } from 'react-router-dom';

import icoinsta from '~/assets/ico-insta.jpg';
import icoface from '~/assets/ico-face.jpg';
import icozap from '~/assets/ico-zap.jpg';
import icoin from '~/assets/ico-in.jpg';

import { store } from '~/store';

import { Rod } from './styles';

export default function Rodape() {
  const { logado } = store.getState().auth;

  return (
    <Rod>
      <ul>
        <li>
          <a href="" target="_blank">
            <img src={icozap} alt="WhatsApp" />
          </a>
          <a href="" target="_blank">
            <img src={icoinsta} alt="Instagram" />
          </a>
          <a href="" target="_blank">
            <img src={icoface} alt="Facebook" />
          </a>
          <a href="" target="_blank">
            <img src={icoin} alt="LinkedIn" />
          </a>
        </li>
      </ul>
    </Rod>
  );
}
