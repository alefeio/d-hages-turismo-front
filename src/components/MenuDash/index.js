import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '~/store/modules/auth/actions';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';
import SiteContext from '~/context/site';

export default function MenuDash() {
  const { state } = useContext(SiteContext);

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
        <Link to="/admin/site">
          Adm Site
        </Link>
      </li>
      {state?.banner && <li>
        <Link to="/admin/banners">
          Adm Banners
        </Link>
      </li>}
      {state?.depoimentos && <li>
        <Link to="/admin/depoimentos">
          Adm Depoimentos
        </Link>
      </li>}
      {state?.pacotes && <li>
        <Link to="/admin/roteiros">
          Adm Roteiros
        </Link>
      </li>}
      {state?.servicos && <li>
        <Link to="/admin/servicos">
          Adm Serviços
        </Link>
      </li>}
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
