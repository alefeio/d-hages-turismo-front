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
import lins from '~/assets/lins.jpg';
import moura from '~/assets/moura.jpg';
import apresentacao from '~/assets/home/apresentacao.mp4';
import porque from '~/assets/home/onibus.jpg';

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
  ListaBlog,
  Equipe
} from './styles';
import { Helmet } from 'react-helmet';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';
import { useSelector } from 'react-redux';
import SiteContext from '~/context/site';
import { removerEspacosEAcentos } from '~/util/removerEspacosEAcentos';

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
  const [blog, setBlog] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalBlog, setTotalBlog] = useState(0);
  const [depoimentos, setDepoimentos] = useState([]);
  const [textWpp, setTextWpp] = useState("Quero mais informações. Estou entrando em contato através do site.");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [sendNews, setSendNews] = useState(false);
  const [busca, setBusca] = useState('');
  const [pageSize, setPageSize] = useState(12);
  const [buscaBlog, setBuscaBlog] = useState('');
  const [dominio, setDominio] = useState('');

  const { state } = useContext(SiteContext);

  const perfil = useSelector((state) => state.usuario.perfil);

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

  console.log('window.location.href', window.location.href);

  async function loadBlog() {
    const response = await api.get(`blog?client=${dominio}&pageSize=${pageSize}`);

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

  async function loadBuscaBlog(busca) {
    const response = await api.get(`buscablog?client=${dominio}&pageSize=${pageSize}&page=1&busca=${buscaBlog}`);

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
      pauseOnHover: false,
    };
    return (
      <Slider {...settings}>
        {banners.map(banner => (
          banner.link && banner.tipo_link == 'interno' ?
            <div>
              <Link key={banner.id} to={`blog/${banner.url}`}>
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
              </Link>
            </div>
            : banner.link && banner.tipo_link == 'externo' ?
              <div>
                <a key={banner.id} href={banner.url} target='_blank'>
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
                </a>
              </div>
              : <div key={banner.id}>
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
    if (!blog.length) {
      buscaBlog ? dominio && loadBuscaBlog(buscaBlog) : dominio && loadBlog();
    }
    !depoimentos.length && dominio && loadDepoimentos();
    console.log('state', state)
    console.log('dominio', dominio)
  }, [dominio, state]);

  useEffect(() => {
    // Chamar a função ao montar o componente
    setDominio(extrairDominioDaURLAtual());
  }, []);

  return (
    <>
      <Helmet>
        <title>{state?.title}</title>
        {dominio === 'appnoticias' && <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5695208654992345"
     crossorigin="anonymous"></script>}
      </Helmet>
      <Container state={state}>
        <WhatsApp>
          <Input name="whatsapp" value={textWpp} onChange={(e) => setTextWpp(e.target.value)} />
          <a href={`https://wa.me//55${state?.whatsapp}?text=${textWpp}`} target='_blank'>
            <img src={wpp} alt="Logo HCS" />
          </a>
        </WhatsApp>
        {state?.banner && <Banner id="home" state={state}>
          {state?.textonobanner && (
            <>
              <section>
                <h3>{state?.titulobanner}</h3>
                <h2>{state?.descricaobanner}</h2>
              </section>
              <section className='news'>
                <p>Acompanhe nossas novidades</p>
                {!sendNews ? (
                  <Email client={state}>
                    <Input name="email" placeholder='Cadastre seu email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button disabled={loading} onClick={handleSubmit}>Enviar</button>
                  </Email>
                ) : (
                  <h3>Obrigado por se cadastrar!</h3>
                )
                }
              </section>
            </>
          )}
          {state?.link && state?.tipo_link == 'interno' ?
            <Link to={state?.url}>
              <SimpleSlider />
            </Link>
            : state?.link && state?.tipo_link == 'interno' ?
              <a url={state?.url} target='_blank'>
                <SimpleSlider />
              </a>
              : <SimpleSlider />
          }
          <SimpleSlider />
        </Banner>}
        {state?.pacotes && <Produtos id="pacotes" client={state}>
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
            <ListaProdutos client={state}>
              {produtos.map((p) => (
                <li key={p.id}>
                  <Link to={`roteiros/${p.id}/${p.url}`}>
                    <img src={p.imagem.url} alt={p.nome} />
                  </Link>
                  <section>
                    <h2>{p.nome}</h2>
                    <h3><span>Saída:</span> {p.saida.split('T')[0].split('-').reverse().join('/')}</h3>
                    <h3><span>Retorno:</span> {p.retorno.split('T')[0].split('-').reverse().join('/')}</h3>
                    <h3><span>Valor por pessoa:</span></h3>
                    <h3><span>À vista:</span> R$ {p.valoravista}</h3>
                    {p.valoraprazo && <h3><span>{p.parcelas}x no cartão:</span> R$ {p.valoraprazo}</h3>}
                  </section>
                  <Link to={`roteiros/${p.id}/${p.url}`}>
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
        {state?.viewdescricao && <Quemsomos client={state} id="sobre">
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
        </Quemsomos>}
        {state?.servicos && <Produtos id="servicos" client={state}>
          <>
            <h2>{state?.servicos}</h2>
            <ListaProdutos client={state}>
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
        {dominio === 'linsemouraadvocacia' && <Equipe client={state} id="equipe">
          <article id="sobre">
            <h1>NOSSA EQUIPE</h1>
            <div>
              <section>
                <img src={lins} />
              </section>
              <aside>
                <h2>Anazilda Lins - OAB-SP N 435.122</h2>
                <p>Graduada em Direito pela renomada Universidade Estácio de Sá, em Belém-PA,
                  e com transferência de sua inscrição na OAB para a cidade de São Paulo, Dra. Anazilda
                  iniciou sua carreira jurídica em um escritório de advocacia no Grande ABC/SP, além
                  de ter trabalhado em escritórios de destaque na capital paulista. Especializou-se em
                  Direito Material e Processual do Trabalho pela Fabel/PA, e em Compliance, LGPD e
                  Prática Trabalhista pelo Centro Universitário do Sul de Minas - UNIS/MG.</p>
                <p>Movida pelo desejo de oferecer um atendimento personalizado e proporcionar
                  a cada cliente uma representação jurídica sólida, decidiu fundar, juntamente com sua
                  sócia Dra. Silvanice Moura, o escritório de advocacia Lins &amp; Moura. Este escritório é
                  caracterizado por ser um espaço acolhedor, com foco na satisfação e na proteção dos
                  interesses individuais de cada cliente.</p>
              </aside>
            </div >
            <div>
              <aside>
                <h2>Silvanice Moura - OAB-PA N 29.005</h2>
                <p>Formada em Direito pela Universidade Estácio de Sá, em Belém do Pará, a
                  advogada desenvolveu sua carreira em dois dos maiores bancos privados do Brasil.
                  Com sua vasta experiência na área bancária, adquiriu conhecimento especializado em
                  prestar atendimento humanizado e resolver as demandas dos clientes, além de
                  dominar o direito do consumidor bancário, taxas, investimentos, cláusulas
                  contratuais de empréstimos e financiamentos, bem como os serviços oferecidos pelos
                  bancos aos clientes.</p>
                <p>Dra. Silvanice é especialista em Direito Previdenciário e do Consumidor
                  Bancário. Motivada por todo o acervo de conhecimento e prática adquiridos durante
                  anos de atuação no setor bancário e como advogada, ela oferece aos seus clientes um
                  atendimento de excelência, baseado em sua sólida base de conhecimento e
                  experiência.</p>
              </aside>
              <section>
                <img src={moura} />
              </section>
            </div >
          </article>
        </Equipe>}
        {state?.blog && <Produtos id="blog" client={state}>
          <>
            <h2>{state?.blog}</h2>
            {/* <nav>
              <Input name="buscaProduto" value={buscaBlog} placeholder='Pesquisar notícia' onChange={(e) => {
                setBuscaBlog(e.target.value);
                loadBuscaBlog(e.target.value);
              }} />
              <MdSearch size={26} color="#000" />
            </nav> */}
            <ListaBlog client={state}>
              {blog.map((p) => (
                <li key={p.id}>
                  <Link to={`blog/${p.url}`}>
                    <img src={p.imagem.url} alt={p.titulo} />
                  </Link>
                  <section>
                    <Link to={`blog/${p.url}`}><h2>{p.titulo}</h2></Link>
                    <p>{p.descricao}</p>
                    <Link to={`blog/${p.url}`}>
                      <span>Ler <MdAdd size={16} color="#FFF" /></span>
                    </Link>
                  </section>
                </li>
              ))}
            </ListaBlog>
          </>
          {totalBlog > 12 && (
            <aside>
              <Link to='/blog'>
                Ver todos
              </Link>
            </aside>
          )}
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
          <Porque bg={porque}>
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
        <Ondeestamos id="ondeestamos">
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
