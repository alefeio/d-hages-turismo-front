import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';

import logo from '~/assets/logo.png';
import logoIopa from '~/assets/logo-iopa.png';
import iconav from '~/assets/icon-nav2.png';
import iconavx from '~/assets/icon-nav_x2.png';

import { logout } from '~/store/modules/auth/actions';

import { Container, Content, Profile, Img, Nav } from './styles';

import { store } from '~/store';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [perfil, setPerfil] = useState();
  const [scrollY, setScrollY] = useState(0);
  const [viewMenu, setViewMenu] = useState('fixed');
  const [bgMenu, setBgMenu] = useState('transparent');
  const [dominio, setDominio] = useState('');

  const perf = useSelector((state) => state.usuario.perfil);

  const { pathname } = useLocation();

  function logit() {
    if (window.pageYOffset < 100) setBgMenu(dominio === 'dhagesturismo' ? 'transparent' : 'white');
    else setBgMenu(dominio === 'dhagesturismo' ? 'black' : 'white');
    // if (window.pageYOffset > scrollY && window.pageYOffset > 100) setViewMenu('absolute');
    // else setViewMenu('fixed');

    setScrollY(window.pageYOffset);
    // console.log(window.pageYOffset);
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

  useEffect(() => {
    // Chamar a função ao montar o componente
    setDominio(extrairDominioDaURLAtual());
  }, []);

  useEffect(() => {
    setBgMenu(dominio === 'dhagesturismo' ? 'transparent' : 'white');
    setViewMenu(dominio === 'dhagesturismo' ? 'fixed' : 'relative');
  }, [dominio]);

  return (
    <Container viewMenu={viewMenu} bgMenu={bgMenu}>
      <Content bgMenu={bgMenu} client={dominio}>
        <Link to="/#home" onClick={altChecked}>
          {dominio === 'dhagesturismo' ? (
            <img src={logo} alt="Logomarca da agência D' Hages Turismo" />
          ) : dominio === 'iopa' ? (
            <img src={logoIopa} alt="IOPA" />
          ) : (
            <></>
          )
          }
        </Link>
        <Toggle />
        <Nav exibir={checked} client={dominio} bgMenu={bgMenu}>
          <ul>
            {dominio === 'dhagesturismo' ? (
              <>
                <li>
                  <a href="/#home" onClick={altChecked}>
                    HOME
                  </a>
                </li>
                <li>
                  <a href="/roteiros" onClick={altChecked}>
                    ROTEIROS
                  </a>
                </li>
                <li>
                  <a href="/#depoimentos" onClick={altChecked}>
                    DEPOIMENTOS
                  </a>
                </li>
                <li>
                  <a href="/#sobre" onClick={altChecked}>
                    A D' HAGES
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
                <li>
                  <Link to="/contato" onClick={altChecked}>
                    CONTATO
                  </Link>
                </li>
              </>
            ) : dominio === 'iopa' ? (
              <>
                <li>
                  <Link to={"/#home"} onClick={altChecked}>
                    HOME
                  </Link>
                </li>
                <li>
                  <Link to="/#sobre" onClick={altChecked}>
                    SOBRE NÓS
                  </Link>
                </li>
                <li>
                  <Link to="/#sobre" onClick={altChecked}>
                    CONVÊNIOS
                  </Link>
                </li>
                <li>
                  <Link to={dominio === 'dhagesturismo' ? "/roteiros" : '/#servicos'} onClick={altChecked}>
                    SERVIÇOS
                  </Link>
                </li>
                <li>
                  <Link to="/#ondeestamos" onClick={altChecked}>
                    ONDE ESTAMOS
                  </Link>
                </li>
                <li>
                  <Link to="/#contato" onClick={altChecked}>
                    CONTATO
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )
            }

            {logado && (
              <>
                {/* <li>
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
                </li> */}
                <li>
                  <Link to='/dashboard'>
                    ADM
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout}>
                    SAIR
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
