import React, { useState, useEffect, useContext } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import api from '~/services/api';
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Container, Barra, Banner, Prod, WhatsApp } from './styles';

import wpp from '~/assets/wpp.png';
import { Helmet } from 'react-helmet';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';
import SiteContext from '~/context/site';

const schema = Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório!'),
  email: Yup.string()
    .email('E-mail inválido!')
    .required('Campo obrigatório!'),
  telefone: Yup.string().required('Campo obrigatório!'),
  assunto: Yup.string(),
  mensagem: Yup.string().required('Campo obrigatório!'),
});

export default function Artigo(props) {
  const [produto, setProduto] = useState({});
  const [imagem, setImagem] = useState();
  const [initialData, setInitialData] = useState({});
  const [display, setDisplay] = useState('relative');
  const [textWpp, setTextWpp] = useState('');
  const [viewFormReserva, setViewFormReserva] = useState(false);
  const [reservado, setReservado] = useState(false);
  const [dominio, setDominio] = useState('');
  const [blog, setBlog] = useState([]);

  const { state } = useContext(SiteContext);

  const nome = props.match.params.nome;
  const id = props.match.params.id;

  function logit() {
    if (window.pageYOffset > 500) setDisplay('fixed');
    else setDisplay('relative');
  }

  function removerEspacosEAcentos(texto) {
    // Remover espaços
    let textoSemEspacos = texto.replace(/\s/g, '-');

    // Remover acentuações
    let textoSemAcentos = textoSemEspacos.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return textoSemAcentos.toLowerCase();
  }

  async function loadBlog() {
    const response = await api.get(`blog?client=${dominio}`);

    console.log('blog', response);

    const { blog, total } = response.data;

    const newData = blog.map(data => {
      data.url = removerEspacosEAcentos(data.titulo);

      return data;
    });

    console.log(`data: ${JSON.stringify(response.data)}`);

    setBlog(newData);
  }

  async function loadProduto() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const response = await api.get(`blog/${nome}/${id}`);

    console.log(response.data);
    setProduto(response.data);
    setImagem(response.data.imagem.url);

    setInitialData({
      assunto: response.data.nome,
    });

    setTextWpp(`Quero + inf. sobre ${response.data.nome}`);
  }

  useEffect(() => {
    loadProduto();
  }, [nome, id]);

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
    !blog.length && loadBlog();
  }, [dominio, state]);

  useEffect(() => {
    // Chamar a função ao montar o componente
    setDominio(extrairDominioDaURLAtual());
  }, []);

  return (
    <>
      <Helmet>
        <title>{produto.saida && `IOPA - ${produto.nome}`}</title>
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
            <nav>
              <img src={imagem} alt="Produto" />
            </nav>
            <span>
              <h1>{produto.titulo}</h1>
              <h2>{produto.descricao}</h2>
              <section
                dangerouslySetInnerHTML={{ __html: produto.texto }}
              ></section>
              {/* <p><a href='#' onClick={() => setViewFormReserva(true)}>Clique aqui e agende uma consulta.</a></p> */}
              <p>
                <Link to="#contato">Clique aqui e agende uma consulta.</Link>
              </p>
            </span>
          </div>
          <aside>
            {blog.map(p => p.titulo !== produto.titulo && (
              <div>
                <nav>
                  <Link to={`/blog/${p.url}/${p.id}`}>
                    <img src={p.imagem.url} alt={p.nome} />
                  </Link>
                </nav>
                <span>
                  <Link to={`/blog/${p.url}/${p.id}`}>
                    <h3>{p.titulo}</h3>
                  </Link>
                  <p>{p.descricao}</p>
                </span>
              </div>
            ))}
          </aside>
        </Prod>
      </Container>
    </>
  );
}
