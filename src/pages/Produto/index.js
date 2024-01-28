import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '~/services/api';
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Container, Barra, Banner, Prod, WhatsApp } from './styles';

import wpp from '~/assets/wpp.png';
import { Helmet } from 'react-helmet';

const schema = Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório!'),
  email: Yup.string().email('E-mail inválido!').required('Campo obrigatório!'),
  telefone: Yup.string().required('Campo obrigatório!'),
  assunto: Yup.string(),
  mensagem: Yup.string().required('Campo obrigatório!'),
});

export default function Pacote(props) {
  const [produto, setProduto] = useState({});
  const [imagem, setImagem] = useState();
  const [detalhes, setDetalhes] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [display, setDisplay] = useState('relative');
  const [textWpp, setTextWpp] = useState("");
  const [viewFormReserva, setViewFormReserva] = useState(false);
  const [reservado, setReservado] = useState(false);

  const nome = props.match.params.nome;
  const id = props.match.params.id;

  function logit() {
    if (window.pageYOffset > 500) setDisplay('fixed');
    else setDisplay('relative');
  }

  async function handleSubmit({ nome, email, telefone, assunto, mensagem }) {
    try {
      await api.post('contato', {
        nome,
        email,
        telefone,
        assunto,
        mensagem,
      });

      toast.success(
        'Obrigado! Sua pré-reserva foi enviada com sucesso. Em breve retornaremos.'
      );

      setReservado(true);
    } catch (error) {
      toast.error('Erro ao enviar sua reserva. Tente novamente!');
    }
  }

  async function loadProduto() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const response = await api.get(`pacotes/${nome}/${id}`);

    console.log(response.data);
    setProduto(response.data);
    setImagem(response.data.imagem.url);

    setInitialData({
      assunto: `Mais informações sobre ${response.data.nome}, de ${response.data.saida.split('T')[0].split('-')[1] === response.data.retorno.split('T')[0].split('-')[1]
        ? response.data.saida.split('T')[0].split('-').reverse()[0]
        : response.data.saida.split('T')[0].split('-').reverse().join('/')} a ${response.data.retorno && response.data.retorno.split('T')[0].split('-').reverse().join('/')}`,
    });

    setTextWpp(`Quero + inf. sobre ${response.data.nome}, de ${response.data.saida.split('T')[0].split('-')[1] === response.data.retorno.split('T')[0].split('-')[1]
      ? response.data.saida.split('T')[0].split('-').reverse()[0]
      : response.data.saida.split('T')[0].split('-').reverse().join('/')} a ${response.data.retorno && response.data.retorno.split('T')[0].split('-').reverse().join('/')}`)
  }

  useEffect(() => {
    loadProduto();
  }, []);

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  });

  return (
    <>
      <Helmet>
        <title>
          {produto.saida && (
            `Viaje com a D' Hages para ${produto.nome} - saída: ${produto.saida.split('T')[0].split('-').reverse().join('/')}, retorno: ${produto.retorno && produto.retorno.split('T')[0].split('-').reverse().join('/')}`
          )}
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
            <li>
              <Link to="/roteiros">Roteiros</Link>
            </li>
            <li>/</li>
            <li>{produto && produto.nome}</li>
          </ul>
        </Barra>
        <Prod display={display}>
          <div>
            {produto.saida && <h1>
              {produto.nome} - {produto.saida.split('T')[0].split('-')[1] === produto.retorno.split('T')[0].split('-')[1]
                ? produto.saida.split('T')[0].split('-').reverse()[0]
                : produto.saida.split('T')[0].split('-').reverse().join('/')} a {produto.retorno && produto.retorno.split('T')[0].split('-').reverse().join('/')}
            </h1>}
            <img src={imagem} alt="Produto" />
            <h2>Destino: {produto.nome}</h2>
            <h3>Saída: {produto.saida && produto.saida.split('T')[0].split('-').reverse().join('/')}</h3>
            <h3>Retorno: {produto.retorno && produto.retorno.split('T')[0].split('-').reverse().join('/')}</h3>
            <h3>Valor por pessoa:</h3>
            <span>À vista: R$ {produto.valoravista}</span><br />
            {produto.valoraprazo && <span>{produto.parcelas}x no cartão: R$ {produto.valoraprazo}</span>}
            <h3>Detalhes:</h3>
            <section dangerouslySetInnerHTML={{ __html: produto.descricao }}></section>
          </div>
          {!viewFormReserva ? (
            <aside onClick={() => setViewFormReserva(true)}>Mais informações</aside>
          ) : (
            <Form schema={schema} onSubmit={handleSubmit} initialData={initialData} id='#reserva'>
              <h2 onClick={() => setViewFormReserva(false)}>Mais informações</h2>
              {!reservado ? (
                <>
                  <Input name="nome" placeholder="Seu nome" />
                  <Input name="email" type="email" placeholder="Seu e-mail" />
                  <Input name="telefone" placeholder="Telefone ou celular" />
                  <Input name="assunto" placeholder="Assunto" />
                  <Textarea name="mensagem" placeholder="Especifique aqui a quantidade de reservas ou alguma necessidade específica" />

                  <button type="submit">Enviar</button>
                </>
              ) : (
                <h3>Obrigado! Sua pré-reserva foi enviada com sucesso. Em breve retornaremos.</h3>
              )}
            </Form>
          )}
        </Prod>
      </Container>
    </>
  );
}
