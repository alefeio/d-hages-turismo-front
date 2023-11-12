import React from 'react';
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import api from '~/services/api';

import logo from '~/assets/logo.png';
import b01 from '~/assets/home01.jpg';
import b02 from '~/assets/home02.jpg';
import b03 from '~/assets/home03.jpg';
import b04 from '~/assets/home04.jpg';
import b05 from '~/assets/home05.jpg';
import b06 from '~/assets/home06.jpg';
import b07 from '~/assets/home07.jpg';
import aero from '~/assets/aeronaves.jpg';
import icotaxi from '~/assets/ico-taxiaereo.jpg';
import icofrete from '~/assets/ico-fretamento.jpg';
import icomanut from '~/assets/ico-manutencao.jpg';
import icocv from '~/assets/ico-compraevenda.jpg';
import icohang from '~/assets/ico-hangaragem.jpg';
import logoIntensive from '~/assets/logo-intensive.jpg';
import mapa from '~/assets/mapa.jpg';

import {
  Banner,
  Quemsomos,
  Aeronaves,
  Produtos,
  Porque,
  Ondeestamos,
  Trabalhe,
  Container,
} from './styles';

const schema = Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório!'),
  email: Yup.string().email('E-mail inválido!').required('Campo obrigatório!'),
  telefone: Yup.string().required('Campo obrigatório!'),
  mensagem: Yup.string().required('Campo obrigatório!'),
});

export default function Home() {
  async function handleSubmit({ nome, email, telefone, mensagem }) {
    try {
      await api.post('trabalhe', {
        nome,
        email,
        telefone,
        mensagem,
      });

      toast.success(
        'Obrigado! Sua mensagem foi enviada com sucesso. Em breve retornaremos.'
      );
    } catch (error) {
      toast.error('Erro ao enviar sua mensagem. Tente novamente!');
    }
  }

  return (
    <Container>
      <Banner id="home">
        <img src={b01} alt="" />
      </Banner>
      <Quemsomos id="sobre">
        <div>
          <h2>SOBRE</h2>
          <p>
            A HCS é uma empresa de aviação executiva sob-demanda, com aeronaves
            próprias e operações no mercado aéreo. Sediada em São Paulo, Brasil,
            atua há mais de 15 anos no mercado de todo o Brasil e Estados
            Unidos.
          </p>
          <h2>ORIGEM</h2>
          <p>
            Vitor Pessoa, CEO e VIP Holding começou como piloto de aeronaves.
            Com o passar dos anos, se tornou piloto exclusivo de um grande
            empresário, o qual cedeu ao Vitor o comando e cuidado de suas
            aeronaves. Vitor viu uma excelente oportunidade de investir nesse
            mercado vendendo seu primeiro avião. Com a evolução do negócio,
            Vitor tem hoje um alto faturamento e estrutura para expandir ainda
            mais.
          </p>
        </div>
        <ul>
          <li>
            <h2>MISSÃO</h2>
            <p>
              Ser referêcia nacional e internacional na prestação de serviços
              aéreos.
            </p>
          </li>
          <li>
            <h2>VISÃO</h2>
            <p>
              Oferecer soluções em aviação executiva com segurança, conforto e
              qualidade.
            </p>
          </li>
          <li>
            <h2>PILARES</h2>
            <p>Exclusividade, excelência, segurança e conforto.</p>
          </li>
        </ul>
      </Quemsomos>
      <Aeronaves id="aeronaves">
        <h2>AERONAVES</h2>
        <div>
          <img src={aero} alt="Aeronaves" />
        </div>
        <ul>
          <li>
            <Link to="/">Citation Jet</Link>
          </li>
          <li>
            <Link active to="/">
              Robson
            </Link>
          </li>
          <li>
            <Link to="/">King Air F90</Link>
          </li>
        </ul>
      </Aeronaves>
      <Produtos id="taxiaereo">
        <h2>PRODUTOS E SERVIÇOS</h2>
        <ul>
          <li>
            <img src={icotaxi} alt="Táxi Aéreo" />
            Táxi aéreo
          </li>
          <li>
            <img src={icofrete} alt="Fretamento e gerenciamento de aeronaves" />
            Fretamento e gerenciamento de aeronaves
          </li>
          <li>
            <img src={icomanut} alt="Manutenção de aeronaves" />
            Manutenção de aeronaves
          </li>
          <li>
            <img src={icocv} alt="Compra e venda de aeronaves" />
            Compra e venda de aeronaves
          </li>
          <li>
            <img src={icohang} alt="Hangaragem" />
            Hangaragem
          </li>
        </ul>
      </Produtos>
      <Porque>
        <img src={logoIntensive} alt="Intensive Air Taxi Aéreo" />
        <h2>
          POR QUE ESCOLHER
          <br />
          TAXI AÉREO?
        </h2>
        <ul>
          <li>+ Proteção</li>
          <li>+ Segurança</li>
          <li>+ Saúde</li>
          <li>+ Elegância</li>
          <li>+ Conforto</li>
          <li>+ Praticidade</li>
          <li>+ 24h</li>
        </ul>
      </Porque>
      <Ondeestamos id="ondeestamos">
        <h2>ONDE ESTAMOS</h2>
        <img src={mapa} alt="Onde estamos" />
        <h1>ALTA PERFORMANCE PARA USO EXECUTIVO, ISSO É HCS.</h1>
        <h3>CONTATOS TAXI AÉREO - (11) 99109-9715</h3>
      </Ondeestamos>
      <Trabalhe id="contato">
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="nome" placeholder="Nome" />
          <Input name="telefone" placeholder="Telefone" />
          <Input name="email" type="email" placeholder="E-mail" />
          <Textarea name="mensagem" placeholder="Sua mensagem" />

          <button type="submit">Enviar</button>
        </Form>
        <img src={logo} alt="Logo HCS" />
      </Trabalhe>
    </Container>
  );
}
