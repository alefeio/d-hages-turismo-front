import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '~/store/modules/auth/actions';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';

export default function MenuDash() {
  const [dominio, setDominio] = useState('');

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  useEffect(() => {
    // Chamar a função ao montar o componente
    setDominio(extrairDominioDaURLAtual());
  }, []);

  return (
    <ul>
      <li>
        <Link to="/perfil">
          Meu perfil
        </Link>
      </li>
      <li>
        <Link to="/admin/site">
          Adm Site
        </Link>
      </li>
      <li>
        <Link to="/admin/banners">
          Adm Banners
        </Link>
      </li>
      <li>
        <Link to="/admin/depoimentos">
          Adm Depoimentos
        </Link>
      </li>
      {dominio === 'dhagesturismo' ? (
        <li>
          <Link to="/admin/roteiros">
            Adm Roteiros
          </Link>
        </li>
      ) : dominio === 'iopa' ? (
        <li>
          <Link to="/admin/servicos">
            Adm Serviços
          </Link>
        </li>
      ) : ''}
      <li>
        <Link to="/dashboard">
          Mensagens do Site
        </Link>
      </li>
      <li>
        <Link onClick={handleLogout}>
          Sair
        </Link>
      </li>
    </ul>
  );
}
