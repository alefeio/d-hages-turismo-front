import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';
import iconav from '~/assets/icon-nav2.png';
import iconavx from '~/assets/icon-nav_x2.png';

import { logout } from '~/store/modules/auth/actions';

import { Container, Content, Profile, Img, Nav } from './styles';

import { store } from '~/store';

export default function Header() {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [perfil, setPerfil] = useState();

  const perf = useSelector((state) => state.usuario.perfil);

  useEffect(() => {
    async function loadPerfil() {
      setPerfil(perf);
    }

    loadPerfil();
  }, []);

  const { logado } = store.getState().auth;

  function altChecked() {
    setChecked(!checked);
  }

  const Toggle = () => {
    return (
      <Img src={checked ? iconavx : iconav} alt="Menu" onClick={altChecked} />
    );
  };

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Container>
      <Content>
        <Link to="/#home" onClick={altChecked}>
          <img src={logo} alt="HCS Aviation" />
        </Link>
        <Toggle />
        <Nav exibir={checked}>
          <ul>
            <li>
              <Link to="/#home" onClick={altChecked}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="/#sobre" onClick={altChecked}>
                SOBRE
              </Link>
            </li>
            <li>
              <Link to="/#aeronaves" onClick={altChecked}>
                AERONAVES
              </Link>
            </li>
            <li>
              <Link to="/#taxiaereo" onClick={altChecked}>
                TÁXI AÉREO
              </Link>
            </li>
            <li>
              <Link to="/#ondeestamos" onClick={altChecked}>
                ONDE ESTAMOS
              </Link>
            </li>
            <li>
              <Link to="/compraevenda" onClick={altChecked}>
                COMPRA E VENDA
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={altChecked}>
                BLOG
              </Link>
            </li>
            <li>
              <Link to="/#contato" onClick={altChecked}>
                CONTATO
              </Link>
            </li>
            {/* <li>
              <input type="search" placeholder="Buscar" />
            </li> */}
          </ul>
        </Nav>
        {logado && (
          <Profile>
            <div>
              <strong>{perfil && perfil.nome}</strong>
              <Link to="/perfil">Meu perfil</Link> <br />
              <Link to="/contatoforms">Msgs Contato</Link>
              <Link onClick={handleLogout}>Sair</Link>
            </div>
          </Profile>
        )}
      </Content>
    </Container>
  );
}
