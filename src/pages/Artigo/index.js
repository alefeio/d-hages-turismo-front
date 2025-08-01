import React, { useState, useEffect, useContext } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import api from '~/services/api';
import { Input } from '@rocketseat/unform';

import { Container, Barra, Prod, WhatsApp } from './styles';

import wpp from '~/assets/wpp.png';
import { Helmet } from 'react-helmet';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';
import SiteContext from '~/context/site';

export default function Artigo(props) {
  const [produto, setProduto] = useState({});
  const [imagem, setImagem] = useState();
  const [initialData, setInitialData] = useState({});
  const [display, setDisplay] = useState('relative');
  const [textWpp, setTextWpp] = useState('');
  const [dominio, setDominio] = useState('');

  const { state } = useContext(SiteContext);

  const nome = props.match.params.nome;

  function logit() {
    if (window.pageYOffset > 500) setDisplay('fixed');
    else setDisplay('relative');
  }

  async function loadProduto() {
    console.log('nome', nome)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const response = await api.get(`blog/${nome}`);

    console.log("loadProduto: ", response.data);
    setProduto(response.data);
    setImagem(response.data.imagem.url);

    setInitialData({
      assunto: response.data.titulo || "",
    });
  }

  useEffect(() => {
    loadProduto();
  }, [nome]);

  useEffect(() => {
    function watchScroll() {
      window.addEventListener('scroll', logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener('scroll', logit);
    };
  });

  useEffect(() => {
    // Chamar a função ao montar o componente
    setDominio(extrairDominioDaURLAtual());
  }, []);

  return (
    <>
      <Helmet>
        <title>My Dress :: {produto && produto.titulo}</title>
      </Helmet>
      <Container>
        <WhatsApp>
          <Input
            name="whatsapp"
            value={textWpp}
            onChange={e => setTextWpp(e.target.value)}
          />
          <a
            href={`https://wa.me/55${state?.whatsapp}?text=${textWpp}`}
            target="_blank"
          >
            <img src={wpp} alt="Logo HCS" />
          </a>
        </WhatsApp>
        <Barra client={state}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link to="/blog">{state?.blog}</Link>
            </li>
            <li>/</li>
            <li>{produto && produto.titulo}</li>
          </ul>
        </Barra>
        <Prod client={state} display={display}>
          <div>
            <img src={imagem} alt="Produto" />
            <span>
              <h1>{produto && produto.titulo}</h1>
              <section
                dangerouslySetInnerHTML={{ __html: produto.texto ? produto.texto : "Sem conteúdo por aqui." }}
              ></section>
            </span>
          </div>
        </Prod>
      </Container>
    </>
  )
}
