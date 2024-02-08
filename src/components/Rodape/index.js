import React, { useEffect, useState } from 'react';

import icoinsta from '~/assets/ico-insta.jpg';
import icoface from '~/assets/ico-face.jpg';

import { store } from '~/store';

import { Rod } from './styles';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';

export default function Rodape() {
  const { logado } = store.getState().auth;
  const [dominio, setDominio] = useState('');

  useEffect(() => {
    // Chamar a função ao montar o componente
    setDominio(extrairDominioDaURLAtual());
  }, []);

  return (
    <Rod>
      {dominio === 'dhagesturismo' && (
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
      )}
    </Rod>
  );
}
