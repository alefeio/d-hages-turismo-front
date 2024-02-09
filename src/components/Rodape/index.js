import React, { useEffect, useState } from 'react';

import icoinsta from '~/assets/ico-insta.png';
import icoface from '~/assets/ico-face.png';

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
    <Rod client={dominio}>
      <ul>
        {dominio === 'dhagesturismo' ? (
          <li>
            <a href="https://instagram.com/dhages_turismo" target="_blank">
              <img src={icoinsta} alt="Instagram" />
            </a>
            <a href="https://facebook.com/dhagesturismo" target="_blank">
              <img src={icoface} alt="Facebook" />
            </a>
          </li>
        ) : dominio === 'iopa' ? (
          <li>
            <a href="https://www.instagram.com/iopa.odonto" target="_blank">
              <img src={icoinsta} alt="Instagram" />
            </a>
            <a href="https://m.facebook.com/p/Clinica-IOPA-100078250309605/?locale=pt_BR" target="_blank">
              <img src={icoface} alt="Facebook" />
            </a>
          </li>
        ) :  ('')}
      </ul>
    </Rod>
  );
}
