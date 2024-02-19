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
  Trabalhe
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

export default function Home() {
  const [banners, setBanners] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState(0);
  const [depoimentos, setDepoimentos] = useState([]);
  const [textWpp, setTextWpp] = useState("Quero mais informações. Estou entrando em contato através do site.");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [sendNews, setSendNews] = useState(false);
  const [busca, setBusca] = useState('');
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

  async function loadBanners() {
    const response = await api.get(`banners?client=${dominio}`);

    console.log(`banners: ${JSON.stringify(response.data)}`);

    setBanners(response.data);
  }

  async function loadProdutos() {
    const response = await api.get(`${dominio === 'dhagesturismo' ? 'pacotes' : 'servicos'}?client=${dominio}`);

    console.log('response', response);

    const { pacotes, total } = response.data;

    const newPacotes = pacotes.map(pacote => {
      pacote.url = removerEspacosEAcentos(pacote.nome);

      return pacote;
    })

    console.log(`pacotes: ${JSON.stringify(response.data)}`);

    setProdutos(newPacotes);
    setTotal(total);
  }

  async function loadBuscaProduto(busca) {
    const response = await api.get(`busca?client=${dominio}&page=1&busca=${busca}`);

    const { produtos, total } = response.data;

    setProdutos(produtos);
    setTotal(total);
  }

  async function loadDepoimentos() {
    const response = await api.get(`depoimentos?client=${dominio}`);

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
        mensagem: data.mensagem ? data.mensagem : dominio === 'dhagesturismo' ? "Acompanhar as novidades sobre os roteiros da D' Hages" : '',
        client: dominio
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
      slidesToShow: 3,
      slidesToScroll: 3,
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
    !banners.length && dominio && loadBanners();
    if (!produtos.length) {
      busca ? dominio && loadBuscaProduto(busca) : dominio && loadProdutos();
    }
    !depoimentos.length && dominio && loadDepoimentos();
  }, [dominio]);

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
          <a href={`https://wa.me//55${dominio === 'dhagesturismo' ? '91981149800' : '91980867245'}?text=${textWpp}`} target='_blank'>
            <img src={wpp} alt="Logo HCS" />
          </a>
        </WhatsApp>
        {state?.banner && <Banner id="home" height={state?.banner_h}>
          {dominio === 'dhagesturismo' ? (
            <>
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
            </>
          ) : (
            <></>
          )}
          <SimpleSlider />
        </Banner>}
        {state?.pacotes && <Produtos id="pacotes" client={dominio}>
          <>
            <h2>{state?.pacotes}</h2>
            {dominio === 'dhagesturismo' && <div>
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
            </div>}
            <nav>
              <Input name="buscaProduto" value={busca} placeholder='Pesquisar roteiro' onChange={(e) => {
                setBusca(e.target.value);
                loadBuscaProduto(e.target.value);
              }} />
              <MdSearch size={26} color="#000" />
            </nav>
            <ListaProdutos client={dominio}>
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
          </>
          {total > 12 && (
            <aside>
              <Link to='/roteiros'>
                Ver todos
              </Link>
            </aside>
          )}
        </Produtos>}
        <Quemsomos client={dominio} id="sobre">
          <div>
            <section>
              {(
                state?.imagem?.url.split('.')[state?.imagem?.url.split('.').length - 1] === 'webm'
                || state?.imagem?.url.split('.')[state?.imagem?.url.split('.').length - 1] === 'mp4'
                || state?.imagem?.url.split('.')[state?.imagem?.url.split('.').length - 1] === 'mov'
                || state?.imagem?.url.split('.')[state?.imagem?.url.split('.').length - 1] === 'wmv'
                || state?.imagem?.url.split('.')[state?.imagem?.url.split('.').length - 1] === 'avi'
                || state?.imagem?.url.split('.')[state?.imagem?.url.split('.').length - 1] === 'html5'
              )
                ? (
                  <video loop="loop" controls>
                    <source src={state?.imagem?.url} type="video/mp4" />
                    <object data="">
                      <embed src={state?.imagem?.url} />
                    </object>
                  </video>
                ) : (
                  <img src={state?.imagem?.url} />
                )
              }
            </section>
            <div>
              <h1>{state?.nome}</h1>
              <div dangerouslySetInnerHTML={{ __html: state?.descricao }}></div>
            </div>
          </div >
        </Quemsomos>
        {state?.servicos && <Produtos id="pacotes" client={dominio}>
          <>
            <h2>{state?.servicos}</h2>
            <p>Conte com a nossa equipe para atendê-lo com qualidade e conforto.</p>
            <ListaProdutos client={dominio} id="servicos">
              {produtos.map((p) => (
                <li key={p.id}>
                  <Link to={`servicos/${p.url}/${p.id}`}>
                    <img src={p.imagem.url} alt={p.nome} />
                  </Link>
                  <section>
                    <h2>{p.nome}</h2>
                  </section>
                  <Link to={`servicos/${p.url}/${p.id}`}>
                    <div>
                      <MdAdd size={16} color="#FFF" />
                      <span>Informações</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ListaProdutos>
          </>
        </Produtos>}
        {state?.depoimentos && (
          <Depoimentos id="depoimentos">
            <section>
              <h2>{state?.depoimentos}</h2>
              <SimpleSlider2 />
              {/* <h3>AVALIAÇÕES NO GOOGLE</h3> */}
              <SimpleSlider3 />
              <p>
                <a href='https://g.page/r/CVJZFvP8DiABEB0/review' target='_blank'>
                  Já viajou conosco? Clique aqui para avaliar nossa empresa
                </a>
              </p>
            </section>
          </Depoimentos>
        )}
        {dominio === 'dhagesturismo' && (
          <Porque client={dominio}>
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
        )}
        <Ondeestamos id="ondeestamos" client={dominio}>
          {dominio === 'dhagesturismo' ? (
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15954.345782500639!2d-48.4780747!3d-1.4238214!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a48bfd67c896fd%3A0x1200efcf3165952!2sD&#39;%20Hages%20Turismo!5e0!3m2!1spt-BR!2sbr!4v1700398532335!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          ) : dominio === 'iopa' ? (
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d512.769087725473!2d-48.49295146693843!3d-1.46262561667011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92a48e6869162efd%3A0xb285eac506dae6bb!2sIOPA-Instituto%20Odontol%C3%B3gico%20do%20Par%C3%A1!5e0!3m2!1spt-BR!2sbr!4v1707341473904!5m2!1spt-BR!2sbr" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          )
            : ('')}
        </Ondeestamos>
      </Container >
    </>
  );
}
