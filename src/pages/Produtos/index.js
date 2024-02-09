import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';
import api from '~/services/api';
import { Input } from '@rocketseat/unform';

import wpp from '~/assets/wpp.png';

import { Container, Barra, ListaProdutos, Banner, WhatsApp, Produtos } from './styles';
import { Helmet } from 'react-helmet';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';

export default function Pacotes() {
  const [produtos, setProdutos] = useState([]);
  const [textWpp, setTextWpp] = useState("Quero mais informações. Estou entrando em contato através do site.");
  const [imagem, setImagem] = useState();
  const [query, setQuery] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState(false);
  const [busca, setBusca] = useState('');
  const [dominio, setDominio] = useState('');

  function removerEspacosEAcentos(texto) {
    // Remover espaços
    let textoSemEspacos = texto.replace(/\s/g, '-');

    // Remover acentuações
    let textoSemAcentos = textoSemEspacos.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return textoSemAcentos.toLowerCase();
  }

  async function loadProdutos() {
    const response = await api.get(`pacotes?client=${dominio}&page=${query}`);

    const { pacotes, total } = response.data;

    console.log('pacotes', pacotes);

    const totalPage = Math.ceil(total / pageSize);

    const newPacotes = pacotes.map(pacote => {
      pacote.url = removerEspacosEAcentos(pacote.nome);

      return pacote;
    })

    setImagem(pacotes[0]?.imagem.url);
    setProdutos(newPacotes);
    setTotalCount(total);

    if (query < totalPage) setNextPage(true);
    else setNextPage(false);
  }

  async function loadBuscaProduto(busca) {
    const response = await api.get(`busca?client=${dominio}&page=1&busca=${busca}`);

    const { produtos, total } = response.data;

    const totalPage = Math.ceil(total / pageSize);

    setImagem(produtos[0]?.imagem.url);
    setProdutos(produtos);
    setTotalCount(total);

    if (query < totalPage) setNextPage(true);
    else setNextPage(false);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    busca ? dominio && loadBuscaProduto(busca) : dominio && loadProdutos();
  }, [query, dominio]);

  useEffect(() => {
    // Chamar a função ao montar o componente
    setDominio(extrairDominioDaURLAtual());
  }, []);

  return (
    <>
      <Helmet>
        <title>
          D' Hages Turismo - Trabalhamos com excursões regionais e nacionais. Conheça nossos principais destinos: Salinópolis- PA, Ajuruteua- PA, Carolina- MA e suas belas cachoeiras, Lençóis Maranhenses, Jericoacoara, Fortaleza- CE, Recife- PE, Maragogi- AL, Salvador- BA, estendendo até a cidade maravilhosa do Rio de Janeiro e os encantos da região sul do país com Gramado, Canela, Bento Gonçalves...
        </title>
      </Helmet>
      <Container>
        <WhatsApp>
          <Input name="whatsapp" value={textWpp} onChange={(e) => setTextWpp(e.target.value)} />
          <a href={`https://wa.me//5591981149800?text=${textWpp}`} target='_blank'>
            <img src={wpp} alt="Logo HCS" />
          </a>
        </WhatsApp>
        <Banner imagem={imagem} />
        <Barra>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>/</li>
            <li>Roteiros</li>
          </ul>
        </Barra>

        <Produtos id="pacotes">
          <nav>
            <Input name="buscaProduto" placeholder='Pesquisar roteiro' onChange={(e) => {
              setBusca(e.target.value);
              loadBuscaProduto(e.target.value);
            }} />
            <MdSearch size={26} color="#000" />
          </nav>
          <ListaProdutos>
            {produtos.map((p) => (
              <li key={p.id}>
                <Link to={`roteiros/${p.url}/${p.id}`}>
                  <img src={p.imagem.url} alt={p.nome} />
                </Link>
                <section>
                  <h2>{p.nome}</h2>
                  <h3><span>Saída:</span> {p.saida.split('T')[0].split('-').reverse().join('/')}</h3>
                  <h3><span>Retorno:</span> {p.retorno.split('T')[0].split('-').reverse().join('/')}</h3>
                  <h3><span>Valor por pessoa:</span></h3>
                  <p>À vista: R$ {p.valoravista}</p>
                  {p.valoraprazo && <p>{p.parcelas}x no cartão: R$ {p.valoraprazo}</p>}
                </section>
                <Link to={`roteiros/${p.url}/${p.id}`}>
                  <div>
                    <MdAdd size={16} color="#FFF" />
                    <span>Informações</span>
                  </div>
                </Link>
              </li>
            ))}
          </ListaProdutos>
          <aside>
            {query > 1 && <Link to={`?page=${query > 1 ? Number(query) - 1 : 1}`} onClick={() => {
              setQuery(query > 1 ? Number(query) - 1 : 1);
            }}>
              Anterior
            </Link>}
            {nextPage && <Link to={`?page=${Number(query) + 1}`} onClick={() => {
              setQuery(Number(query) + 1);
            }}>
              Próxima
            </Link>}
          </aside>
        </Produtos>
      </Container>
    </>
  );
}
