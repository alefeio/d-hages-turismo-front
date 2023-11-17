import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import api from '~/services/api';

import logo from '~/assets/logo.png';
import onibus from '~/assets/home/onibus.jpg';
import wpp from '~/assets/wpp.png';
import depoimento1 from '~/assets/home/depoimento1.webm';
import depoimento2 from '~/assets/home/depoimento2.webm';
import depoimento3 from '~/assets/home/depoimento3.webm';
import dep1 from '~/assets/home/dep1.png';
import dep2 from '~/assets/home/dep2.png';
import dep3 from '~/assets/home/dep3.png';
import dep4 from '~/assets/home/dep4.png';
import dep5 from '~/assets/home/dep5.png';
import dep6 from '~/assets/home/dep6.png';
import dep7 from '~/assets/home/dep7.png';
import dep8 from '~/assets/home/dep8.png';
import dep9 from '~/assets/home/dep9.png';
import dep10 from '~/assets/home/dep10.png';
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
  Depoimentos,
  Produtos,
  Porque,
  Ondeestamos,
  Trabalhe,
  Container,
  WhatsApp,
  Email
} from './styles';

const schema = Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório!'),
  email: Yup.string().email('E-mail inválido!').required('Campo obrigatório!'),
  telefone: Yup.string().required('Campo obrigatório!'),
  mensagem: Yup.string().required('Campo obrigatório!'),
});

export default function Home() {
  const [banners, setBanners] = useState([]);
  const [textWpp, setTextWpp] = useState("Quero viajar com a D' Hages");
  const [email, setEmail] = useState("");

  async function loadBanners() {
    const response = await api.get('banners');

    console.log(`data: ${JSON.stringify(response.data)}`);

    setBanners(response.data);
  }

  function SimpleSlider() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 5000,
      autoplay: true,
      centerPadding: 0,
      fade: true,
      pauseOnHover: false
    };
    return (
      <Slider {...settings}>
        {banners.map(banner => (
          <div>
            {(
              banner.imagem.url.split('.')[banner.imagem.url.split('.').length - 1] === 'webm'
              || banner.imagem.url.split('.')[banner.imagem.url.split('.').length - 1] === 'mp4'
              || banner.imagem.url.split('.')[banner.imagem.url.split('.').length - 1] === 'mov'
              || banner.imagem.url.split('.')[banner.imagem.url.split('.').length - 1] === 'wmv'
              || banner.imagem.url.split('.')[banner.imagem.url.split('.').length - 1] === 'avi'
              || banner.imagem.url.split('.')[banner.imagem.url.split('.').length - 1] === 'html5'
            )
              ? (
                <video autoplay="autoplay" loop="loop" muted>
                  <source src={banner.imagem.url} type="video/mp4" />
                  <object data="">
                    <embed src={banner.imagem.url} />
                  </object>
                </video>
              ) : (
                <img src={banner.imagem.url} alt={banner.titulo} />
              )
            }
          </div>
        ))}
      </Slider>
    );
  }

  function SimpleSlider2() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 3,
      centerPadding: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
            centerMode: true,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <Slider {...settings}>
        <section>
          <video controls>
            <source src={depoimento2} type="video/mp4" />
            <object data="">
              <embed src={depoimento2} />
            </object>
          </video>
        </section>
        <section>
          <video controls>
            <source src={depoimento1} type="video/mp4" />
            <object data="">
              <embed src={depoimento1} />
            </object>
          </video>
        </section>
        <section>
          <video controls>
            <source src={depoimento3} type="video/mp4" />
            <object data="">
              <embed src={depoimento3} />
            </object>
          </video>
        </section>
      </Slider>
    );
  }

  function SimpleSlider3() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 2,
      slidesToScroll: 2,
      centerPadding: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true,
            centerMode: true,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <Slider {...settings}>
        <section>
          <img src={dep1} alt="" />
        </section>
        <section>
          <img src={dep2} alt="" />
        </section>
        <section>
          <img src={dep3} alt="" />
        </section>
        <section>
          <img src={dep4} alt="" />
        </section>
        <section>
          <img src={dep5} alt="" />
        </section>
        <section>
          <img src={dep6} alt="" />
        </section>
        <section>
          <img src={dep7} alt="" />
        </section>
        <section>
          <img src={dep8} alt="" />
        </section>
        <section>
          <img src={dep9} alt="" />
        </section>
        <section>
          <img src={dep10} alt="" />
        </section>
      </Slider>
    );
  }

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

  useEffect(() => {
    !banners.length && loadBanners();
  }, [banners]);

  return (
    <Container>
      <WhatsApp>
        <Input name="whatsapp" value={textWpp} onChange={(e) => setTextWpp(e.target.value)} />
        <a href={`https://wa.me//5591982651414?text=${textWpp}`} target='_blank'>
          <img src={wpp} alt="Logo HCS" />
        </a>
      </WhatsApp>
      <Banner id="home">
        <section>
          <h3>Seja muito bem-vindo</h3>
          <h2>à sua próxima aventura</h2>
          <p>Cadastre seu email e acompanhe nossas novidades</p>
          <Email>
            <Input name="email" placeholder='Digite seu melhor email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <button>Enviar</button>
          </Email>
        </section>
        <SimpleSlider />
      </Banner>
      <Quemsomos id="sobre">
        <div>
          <section>
            <img src={onibus} alt="Frota D Hages Turismo" />
          </section>
          <div>
            <h1>Viage com a D' Hages Turismo</h1>
            <p>
              Fundada em agosto de 2015 com intuito de levar o nortista a conhecer as belezas da sua própria região e do Brasil, a D’ Hages Turismo atualmente trabalha com excursões regionais e nacionais. Contando com pacotes que vão do norte ao sul do país, contemplando a natureza, cultura e área urbana de cada região.
            </p>
            <p>
              Entre os principais destinos estão: Salinópolis- PA, Ajuruteua- PA, Carolina- MA e suas belas cachoeiras, Lençóis Maranhenses, Jericoacoara, Fortaleza- CE, Recife- PE, Maragogi- AL, Salvador- BA, estendendo até a cidade maravilhosa do Rio de Janeiro e os encantos da região sul do país com Gramado, Canela, Bento Gonçalves...
            </p>
            <p>
              Contando com frota própria de ônibus, a empresa também atua na área de fretamento de ônibus, assim, personaliza viagens e experiências únicas para grupos familiares, igrejas, estudantes, atletas.
            </p>
            <p>
              Escolha o roteiro de sua preferência e embarque em uma experiência única com pacotes que irão te oferecer: transporte em ônibus de turismo completo, hospedagem com café da manhã, guia de turismo acompanhante e memórias inesquecíveis.
            </p>
          </div>
        </div>
        <ul>
          <li>
            <h2>MISSÃO</h2>
            <p>
              Proporcionar ao nortista a melhor aventura pelo Brasil
            </p>
          </li>
          <li>
            <h2>PILARES</h2>
            <p>Exclusividade, excelência, segurança e conforto.</p>
          </li>
        </ul>
      </Quemsomos>
      <Depoimentos id="aeronaves">
        <h2>DEPOIMENTOS</h2>
        <SimpleSlider2 />
        <SimpleSlider3 />
        <p>
          <a href='https://g.page/r/CVJZFvP8DiABEB0/review' target='_blank'>
            Já viajou conosco? Clique aqui para avaliar nossa empresa no Google
          </a>
        </p>
      </Depoimentos>
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
    </Container >
  );
}
