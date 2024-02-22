import React, { useContext, useEffect, useState } from 'react';
import Slider from "react-slick";
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import api from '~/services/api';

import wpp from '~/assets/wpp.png';
import iopa from '~/assets/iopa.png';
import apresentacao from '~/assets/home/apresentacao.mp4';

import {
  Banner,
  Quemsomos,
  Depoimentos,
  Produtos,
  Porque,
  Ondeestamos,
  Container,
  WhatsApp,
  Email,
  ListaProdutos,
  ListaBlog
} from './styles';
import { Helmet } from 'react-helmet';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';
import { useSelector } from 'react-redux';
import SiteContext from '~/context/site';

const schema = Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório!'),
  telefone: Yup.string().required('Campo obrigatório!'),
  email: Yup.string().email('E-mail inválido!').required('Campo obrigatório!'),
  assunto: Yup.string(),
  mensagem: Yup.string().required('Campo obrigatório!'),
});

export default function Blog() {
  const [produtos, setProdutos] = useState([]);
  const [blog, setBlog] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalBlog, setTotalBlog] = useState(0);
  const [textWpp, setTextWpp] = useState("Quero mais informações. Estou entrando em contato através do site.");

  const [busca, setBusca] = useState('');
  const [buscaBlog, setBuscaBlog] = useState('');
  const [dominio, setDominio] = useState('');

  const { state } = useContext(SiteContext);

  const perfil = useSelector((state) => state.usuario.perfil);

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
    })

    console.log(`data: ${JSON.stringify(response.data)}`);

    setBlog(newData);
    setTotalBlog(total);
  }

  async function loadBuscaProduto(busca) {
    const response = await api.get(`busca?client=${dominio}&page=1&busca=${busca}`);

    const { produtos, total } = response.data;

    setProdutos(produtos);
    setTotal(total);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!blog.length) {
      buscaBlog ? dominio && loadBuscaProduto(busca) : dominio && loadBlog();
    }
  }, [dominio, state]);

  useEffect(() => {
    // Chamar a função ao montar o componente
    setDominio(extrairDominioDaURLAtual());
  }, []);

  return (
    <>
      <Helmet>
        <title>{state?.title}</title>
      </Helmet>
      <Container state={state}>
        <WhatsApp>
          <Input name="whatsapp" value={textWpp} onChange={(e) => setTextWpp(e.target.value)} />
          <a href={`https://wa.me//55${state?.whatsapp}?text=${textWpp}`} target='_blank'>
            <img src={wpp} alt="Logo HCS" />
          </a>
        </WhatsApp>{state?.blog && <Produtos id="pacotes" client={state}>
          <>
            <h2>{state?.blog}</h2>
            <nav>
              <Input name="buscaProduto" value={busca} placeholder='Pesquisar roteiro' onChange={(e) => {
                setBusca(e.target.value);
                loadBuscaProduto(e.target.value);
              }} />
              <MdSearch size={26} color="#000" />
            </nav>
            <ListaBlog client={state}>
              {blog.map((p) => (
                <li key={p.id}>
                  <Link to={`roteiros/${p.url}/${p.id}`}>
                    <img src={p.imagem.url} alt={p.nome} />
                  </Link>
                  <section>
                    <h2>{p.titulo}</h2>
                    <p>{p.descricao}</p>
                  </section>
                  <Link to={`roteiros/${p.url}/${p.id}`}>
                    <div>
                      <span>Ler <MdAdd size={16} color="#FFF" /></span>
                    </div>
                  </Link>
                </li>
              ))}
            </ListaBlog>
          </>
          {totalBlog > 12 && (
            <aside>
              <Link to='/roteiros'>
                Ver todos
              </Link>
            </aside>
          )}
        </Produtos>}
      </Container >
    </>
  );
}
