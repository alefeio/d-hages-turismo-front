import React, { useState, useEffect, useContext } from 'react';
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
import SiteContext from '~/context/site';

export default function Header() {
  const dispatch = useDispatch();

  const params = new URLSearchParams(window.location.search);

  const [checked, setChecked] = useState(false);
  const [perfil, setPerfil] = useState();
  const [scrollY, setScrollY] = useState(0);
  const [viewMenu, setViewMenu] = useState('absolute');
  const [bgMenu, setBgMenu] = useState('transparent');
  const [dominio, setDominio] = useState('');

  const { state } = useContext(SiteContext);

  const perf = useSelector((state) => state.usuario.perfil);

  const { pathname } = useLocation();

  function logit() {
    setBgMenu(window.pageYOffset < 100 && state?.primary_color === 'transparent' ? 'transparent' : state?.primary_color);
    // if (window.pageYOffset > scrollY && window.pageYOffset > 100) setViewMenu('absolute');
    if (window.pageYOffset > 0) setViewMenu('fixed');
    else setViewMenu(state?.primary_color === 'transparent' ? 'absolute' : 'relative');

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
    // Chamar a função ao montar o componente
    if (params.size > 0) {
      localStorage.setItem('codigo_up', String(params.toString().split('=')[1].split('%40').join('@')));
      console.log('params.toString()', params.toString())
    }
  }, [params]);

  useEffect(() => {
    setBgMenu(state?.primary_color);
    setViewMenu(state?.primary_color === 'transparent' ? 'absolute' : 'relative');
  }, [dominio]);

  return (
    <Container state={state} scrollY={scrollY} bgMenu={bgMenu} viewMenu={viewMenu} >
      <Content viewMenu={viewMenu} state={state}>
        <Link to="/#home" onClick={altChecked}>
          {state?.tipo_logo === 'imagem' ? <img src={state?.logo?.url} alt={state?.nome} /> : state?.tipo_logo === 'texto' ? <h1>{state?.logo_texto}</h1> : ''}
        </Link>
        <Toggle />
        <Nav exibir={checked} state={state}>
          <ul>
            <li>
              <Link to="/#home" onClick={altChecked}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="/#sobre" onClick={altChecked}>
              {state?.nome}
              </Link>
            </li>
            {state?.servicos && <li>
              <Link to='/#servicos' onClick={altChecked}>
                {state?.servicos}
              </Link>
            </li>}
            {state?.pacotes && <li>
              <Link to="/#pacotes" onClick={altChecked}>
                {state?.pacotes}
              </Link>
            </li>}
            {state?.depoimentos && <li>
              <Link to="/#depoimentos" onClick={altChecked}>
                {state?.depoimentos}
              </Link>
            </li>}
            {state?.blog && <li>
              <Link to="/#blog" onClick={altChecked}>
                {state?.blog}
              </Link>
            </li>}
            {state?.mapa && <li>
              <Link to="/#ondeestamos" onClick={altChecked}>
                ONDE ESTAMOS
              </Link>
            </li>}
            <li>
              <a href={`https://wa.me/55${state?.whatsapp}?text=Olá! Estou entrando em contato através do site.`} target='_blank' onClick={altChecked}>
                WHATSAPP
              </a>
            </li>
            <li>
              <Link to="/#contato" onClick={altChecked}>
                CONTATO
              </Link>
            </li>
            {logado ? (
              <>
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
            ) : (
              <>
                {state?.view_login && <li>
                  <Link to="/login" onClick={altChecked}>
                    LOGIN
                  </Link>
                </li>}
                {state?.view_cadastro && <li>
                  <Link to="/cadastro" onClick={altChecked}>
                    CADASTRO
                  </Link>
                </li>}
              </>
            )}
          </ul>
        </Nav>
      </Content>
    </Container>
  );
}
