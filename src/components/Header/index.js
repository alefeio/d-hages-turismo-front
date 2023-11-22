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
  const [scrollY, setScrollY] = useState(0);
  const [viewMenu, setViewMenu] = useState('fixed');
  const [bgMenu, setBgMenu] = useState('transparent');

  const perf = useSelector((state) => state.usuario.perfil);

  function logit() {
    if (window.pageYOffset < 100) setBgMenu('transparent');
    else setBgMenu('black');
    if (window.pageYOffset > scrollY && window.pageYOffset > 100) setViewMenu('absolute');
    else setViewMenu('fixed');

    setScrollY(window.pageYOffset);
    console.log(window.pageYOffset);
  }

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

  useEffect(() => {
    async function loadPerfil() {
      setPerfil(perf);
    }

    loadPerfil();
  }, []);

  useEffect(() => {
    setScrollY(window.pageYOffset);

    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  });

  return (
    <Container viewMenu={viewMenu} bgMenu={bgMenu}>
      <Content>
        <Link to="/#home" onClick={altChecked}>
          <img src={logo} alt="Logomarca da agência D' Hages Turismo" />
        </Link>
        <Toggle />
        <Nav exibir={checked}>
          <ul>
            <li>
              <a href="/#home" onClick={altChecked}>
                HOME
              </a>
            </li>
            <li>
              <a href="/#sobre" onClick={altChecked}>
                A D' HAGES
              </a>
            </li>
            <li>
              <a href="/roteiros" onClick={altChecked}>
                ROTEIROS
              </a>
            </li>
            <li>
              <a href="https://wa.me/5591981149800?text=Quero fazer uma reserva" target='_blank' onClick={altChecked}>
                FAÇA SUA RESERVA
              </a>
            </li>
            <li>
              <a href="/#ondeestamos" onClick={altChecked}>
                ONDE ESTAMOS
              </a>
            </li>
            {/* <li>
              <Link to="/blog" onClick={altChecked}>
                BLOG
              </Link>
            </li> */}
            <li>
              <Link to="/contato" onClick={altChecked}>
                CONTATO
              </Link>
            </li>
            {/* <li>
              <input type="search" placeholder="Buscar" />
            </li> */}

            {logado && (
              <>
                <li>
                  <Link to="/perfil">
                    Meu perfil
                  </Link>
                </li>
                <li>
                  <Link to="/admin/roteiros">
                    Adm Roteiros
                  </Link>
                </li>
                <li>
                  <Link to="/contatoforms">
                    Msgs Contato
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>
                    Sair
                  </Link>
                </li>
              </>
            )}
          </ul>
        </Nav>
      </Content>
    </Container>
  );
}
