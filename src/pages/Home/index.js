import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { Form, Input, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { MdAdd, MdSearch } from 'react-icons/md';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import api from '~/services/api';

import onibus from '~/assets/home/onibus.jpg';
import wpp from '~/assets/wpp.png';
import depoimento1 from '~/assets/home/depoimento1.webm';
import depoimento2 from '~/assets/home/depoimento2.webm';
import depoimento3 from '~/assets/home/depoimento3.webm';
import apresentacao from '~/assets/home/apresentacao.mp4';
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
  Trabalhe
} from './styles';
import { Helmet } from 'react-helmet';

const schema = Yup.object().shape({
  nome: Yup.string().required('Campo obrigatório!'),
  telefone: Yup.string().required('Campo obrigatório!'),
  email: Yup.string().email('E-mail inválido!').required('Campo obrigatório!'),
  assunto: Yup.string(),
  mensagem: Yup.string().required('Campo obrigatório!'),
});

export default function Home() {
  const [banners, setBanners] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [depoimentos, setDepoimentos] = useState([]);
  const [textWpp, setTextWpp] = useState("Quero viajar com a D' Hages. Estou entrando em contato através do site.");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [sendNews, setSendNews] = useState(false);
  const [busca, setBusca] = useState('');
  const [dominio, setDominio] = useState('');

  function removerEspacosEAcentos(texto) {
    // Remover espaços
    let textoSemEspacos = texto.replace(/\s/g, '-');

    // Remover acentuações
    let textoSemAcentos = textoSemEspacos.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return textoSemAcentos.toLowerCase();
  }

  async function loadBanners() {
    const response = await api.get('banners');

    console.log(`banners: ${JSON.stringify(response.data)}`);

    setBanners(response.data);
  }

  async function loadProdutos() {
    const response = await api.get(`pacotes?client=${dominio}`);

    const { pacotes } = response.data;

    const newPacotes = pacotes.map(pacote => {
      pacote.url = removerEspacosEAcentos(pacote.nome);

      return pacote;
    })

    console.log(`pacotes: ${JSON.stringify(response.data)}`);

    setProdutos(newPacotes);
  }

  async function loadBuscaProduto(busca) {
    const response = await api.get(`busca?client=${dominio}&page=1&busca=${busca}`);

    const { produtos, total } = response.data;

    setProdutos(produtos);
  }

  async function loadDepoimentos() {
    const response = await api.get('depoimentos');

    console.log(`depoimentos: ${JSON.stringify(response.data)}`);

    setDepoimentos(response.data);
  }

  async function handleSubmit(data = {}) {
    console.log('data', data);

    setLoading(true);
    try {
      await api.post('contato', {
        nome: data.nome ? data.nome : "lead",
        email: data.email ? data.email : email,
        telefone: data.telefone ? data.telefone : "",
        assunto: data.assunto ? data.assunto : "Newsletter",
        mensagem: data.mensagem ? data.mensagem : "Acompanhar as novidades sobre os roteiros da D' Hages",
      });

      toast.success(
        'Seu email foi cadastrado com sucesso. Em breve retornaremos.'
      );

      data.nome ? setEnviado(true) : setSendNews(true);

      setEmail('');
    } catch (error) {
      toast.error('Erro ao cadastrar seu email. Tente novamente!');
    } finally {
      setLoading(false);
    }
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
        {depoimentos.map(depo => (
          depo.tipo === 'video' &&
          <div>
            <video controls>
              <source src={depo.imagem.url} type="video/mp4" />
              <object data="">
                <embed src={depo.imagem.url} />
              </object>
            </video>
          </div>
        ))
        }
      </Slider >
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
        {depoimentos.map((depo) => (
          depo.tipo === 'foto' &&
          <div>
            <img src={depo.imagem.url} alt="" />
          </div>
        ))}
      </Slider>
    );
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    !banners.length && loadBanners();
    if (!produtos.length) {
      busca ? loadBuscaProduto(busca) : dominio && loadProdutos();
    }
    !depoimentos.length && loadDepoimentos();
  }, [dominio]);

  useEffect(() => {
    // Extrair o domínio automaticamente da URL da página
    const extrairDominioDaURLAtual = () => {
      try {
        const urlObj = new URL(window.location.href);
        setDominio(urlObj.hostname.split('.')[0]);
      } catch (error) {
        console.error('Erro ao extrair o domínio da URL atual');
        setDominio('');
      }
    };

    // Chamar a função ao montar o componente
    extrairDominioDaURLAtual();
  }, []);

  return (
    <Container>
      <WhatsApp>
        <Input name="whatsapp" value={textWpp} onChange={(e) => setTextWpp(e.target.value)} />
        <a href={`https://wa.me//5591981149800?text=${textWpp}`} target='_blank'>
          <img src={wpp} alt="Logo HCS" />
        </a>
      </WhatsApp>
      <Banner id="home">
        <section>
          <h3>Seja muito bem-vindo</h3>
          <h2>à sua próxima aventura</h2>
        </section>
        <section className='news'>
          <p>Acompanhe nossas novidades</p>
          {!sendNews ? (
            <Email>
              <Input name="email" placeholder='Cadastre seu email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <button disabled={loading} onClick={handleSubmit}>Enviar</button>
            </Email>
          ) : (
            <h3>Obrigado por se cadastrar!</h3>
          )
          }
        </section>
        <SimpleSlider />
      </Banner>
      <Produtos id="pacotes">
        <h2>ROTEIROS</h2>
        <p>Escolha seu destino e embarque com a D' Hages Turismo na melhor aventura pelo Brasil</p>
        <h3>Principais roteiros</h3>
        <div>
          <Link onClick={() => {
            setBusca("Fortaleza");
            loadBuscaProduto("Fortaleza");
          }
          }>
            Fortaleza
          </Link>
          <Link onClick={() => {
            setBusca("Carolina-Ma");
            loadBuscaProduto("Carolina-Ma");
          }
          }>
            Carolina-Ma
          </Link>
          <Link onClick={() => {
            setBusca("Mini Nordeste");
            loadBuscaProduto("Mini Nordeste");
          }
          }>
            Mini Nordeste
          </Link>
          <Link onClick={() => {
            setBusca("Lençóis Maranhenses");
            loadBuscaProduto("Lençóis Maranhenses");
          }
          }>
            Lençóis Maranhenses
          </Link>
          <Link onClick={() => {
            setBusca("Rio de Janeiro");
            loadBuscaProduto("Rio de Janeiro");
          }
          }>
            Rio de Janeiro
          </Link>
          <Link onClick={() => {
            setBusca("Fortaleza com Jeri");
            loadBuscaProduto("Fortaleza com Jeri");
          }
          }>
            Fortaleza com Jeri
          </Link>
          <Link onClick={() => {
            setBusca("Ajuruteua");
            loadBuscaProduto("Ajuruteua");
          }
          }>
            Ajuruteua
          </Link>
        </div>
        <nav>
          <Input name="buscaProduto" value={busca} placeholder='Pesquisar roteiro' onChange={(e) => {
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
                <small>À vista: R$ {p.valoravista}</small><br />
                {p.valoraprazo && <small>{p.parcelas}x no cartão: R$ {p.valoraprazo}</small>}
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
          <Link to='/roteiros'>
            Ver todos
          </Link>
        </aside>
      </Produtos>
      <Depoimentos id="depoimentos">
        <section>
          <h2>DEPOIMENTOS</h2>
          <span>Confira a opinião de quem já viajou com a gente</span>
          <SimpleSlider2 />
          <h3>AVALIAÇÕES NO GOOGLE</h3>
          <SimpleSlider3 />
          <p>
            <a href='https://g.page/r/CVJZFvP8DiABEB0/review' target='_blank'>
              Já viajou conosco? Clique aqui para avaliar nossa empresa
            </a>
          </p>
        </section>
      </Depoimentos>
      <Quemsomos id="sobre">
        <div>
          <section>
            <video controls>
              <source src={apresentacao} type="video/mp4" />
              <object data="">
                <embed src={apresentacao} />
              </object>
            </video>
          </section>
          <div>
            <h1>Venha viajar com a D' Hages Turismo</h1>
            <p>
              Fundada em agosto de 2015 com intuito de levar o nortista a conhecer as belezas da sua própria região e do Brasil, a D’ Hages Turismo atualmente trabalha com excursões regionais e nacionais. Contando com roteiros que vão do norte ao sul do país, contemplando a natureza, cultura e área urbana de cada região.
            </p>
            <p>
              Entre os principais destinos estão: Salinópolis- PA, Ajuruteua- PA, Carolina- MA e suas belas cachoeiras, Lençóis Maranhenses, Jericoacoara, Fortaleza- CE, Recife- PE, Maragogi- AL, Salvador- BA, estendendo até a cidade maravilhosa do Rio de Janeiro e os encantos da região sul do país com Gramado, Canela, Bento Gonçalves...
            </p>
            <p>
              Contando com frota própria de ônibus, a empresa também atua na área de fretamento de ônibus, assim, personaliza viagens e experiências únicas para grupos familiares, igrejas, estudantes, atletas.
            </p>
            <p>
              Escolha o roteiro de sua preferência e embarque em uma experiência única, com pacotes que irão te oferecer: transporte em ônibus de turismo completo, hospedagem com café da manhã, guia de turismo acompanhante e memórias inesquecíveis.
            </p>
            <ul>
              <li>
                <h2>PILARES</h2>
                <p>
                  Segurança
                </p>
                <p>
                  Conforto
                </p>
                <p>
                  Atendimento
                </p>
              </li>
              <li>
                <h2>VISÃO</h2>
                <p>
                  Ser a principal escolha em serviços de fretamento de ônibus de turismo na região Norte, oferecendo experiências inigualáveis e destacando-se como referência nacional.
                </p>
              </li>
              <li>
                <h2>MISSÃO</h2>
                <p>
                  Proporcionar aos clientes nortistas a melhor aventura pelo Brasil, garantindo excelência em segurança, conforto e atendimento, tornando cada viagem uma experiência memorável.
                </p>
              </li>
            </ul>
          </div>
        </div >
      </Quemsomos>
      <Porque>
        <h2>
          POR QUE ESCOLHER
          <br />
          A D' HAGES TURISMO
        </h2>
        <ul>
          <li>+ Conforto</li>
          <li>+ Segurança</li>
          <li>+ Aventura</li>
          <li>+ Satisfação</li>
          <li>+ Atendimento</li>
          <li>+ Confiança</li>
        </ul>
      </Porque>
      <Ondeestamos id="ondeestamos">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15954.345782500639!2d-48.4780747!3d-1.4238214!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a48bfd67c896fd%3A0x1200efcf3165952!2sD&#39;%20Hages%20Turismo!5e0!3m2!1spt-BR!2sbr!4v1700398532335!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </Ondeestamos>
      <Trabalhe id="contato">
        <div>
          <h2>Envie-nos uma mensagem</h2>
          <p>Ainda tem dúvidas sobre qual roteiro escolher?
          </p>
          <p>Envie uma mensagem para um de nossos consultores.</p>
        </div>
        {!enviado ? (
          <Form schema={schema} onSubmit={handleSubmit}>
            <Input name="nome" placeholder="Nome" />
            <Input name="telefone" placeholder="Telefone" />
            <Input name="email" type="email" placeholder="E-mail" />
            <Input name="assunto" placeholder="Assunto" />
            <Textarea name="mensagem" placeholder="Sua mensagem" />

            <button disabled={loading} type="submit">Enviar</button>
          </Form>
        ) : (
          <div>
            <h2>Sua mensagem foi enviada com sucesso!</h2>
            <p>Em breve nossa equipe entrará em contato.</p>
          </div>
        )
        }
        {/* <img src={logo} alt="Logo HCS" /> */}
      </Trabalhe>
    </Container >
  );
}
