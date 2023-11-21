import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import api from '~/services/api';
import { Input } from '@rocketseat/unform';

import wpp from '~/assets/wpp.png';

import { Container, Barra, ListaProdutos, Banner, WhatsApp, Produtos } from './styles';

export default function Pacotes() {
  const [produtos, setProdutos] = useState([]);
  const [textWpp, setTextWpp] = useState("Quero viajar com a D' Hages");
  const [imagem, setImagem] = useState();
  const [query, setQuery] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState(false);

  async function loadProdutos() {
    const response = await api.get(`pacotes?page=${query}`);

    const { pacotes, total } = response.data;

    const totalPage = Math.ceil(total / pageSize);

    setImagem(pacotes[0]?.imagem.url);
    setProdutos(pacotes);
    setTotalCount(total);

    if (query < totalPage) setNextPage(true);
    else setNextPage(false);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    loadProdutos();
  }, [query]);

  return (
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
        <ListaProdutos>
          {produtos.map((p) => (
            <li key={p.id}>
              <Link to={`roteiros/${p.id}`}>
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
              <Link to={`roteiros/${p.id}`}>
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
  );
}
