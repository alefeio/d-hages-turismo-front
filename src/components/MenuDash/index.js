import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '~/store/modules/auth/actions';

export default function MenuDash() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <ul>
      <li>
        <Link to="/perfil">
          Meu perfil
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
      <li>
        <Link to="/admin/roteiros">
          Adm Roteiros
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          Msgs Contato
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
