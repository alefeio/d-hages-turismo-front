import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuDash() {
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
    </ul>
  );
}
