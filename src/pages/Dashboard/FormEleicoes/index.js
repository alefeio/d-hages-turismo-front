import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Choice, Form, Input, Select, Check } from '@rocketseat/unform';

import colaborador from '~/assets/colaborador.png';

// import AvatarInput from './AvatarInput';

import { Container } from './styles';
import api from '~/services/api';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';

const estados = [
  { id: 'AC', title: 'Acre' },
  { id: 'AL', title: 'Alagoas' },
  { id: 'AP', title: 'Amapá' },
  { id: 'AM', title: 'Amazonas' },
  { id: 'BA', title: 'Bahia' },
  { id: 'CE', title: 'Ceará' },
  { id: 'DF', title: 'Distrito Federal' },
  { id: 'ES', title: 'Espirito Santo' },
  { id: 'GO', title: 'Goiás' },
  { id: 'MA', title: 'Maranhão' },
  { id: 'MS', title: 'Mato Grosso do Sul' },
  { id: 'MT', title: 'Mato Grosso' },
  { id: 'MG', title: 'Minas Gerais' },
  { id: 'PA', title: 'Pará' },
  { id: 'PB', title: 'Paraíba' },
  { id: 'PR', title: 'Paraná' },
  { id: 'PE', title: 'Pernambuco' },
  { id: 'PI', title: 'Piauí' },
  { id: 'RJ', title: 'Rio de Janeiro' },
  { id: 'RN', title: 'Rio Grande do Norte' },
  { id: 'RS', title: 'Rio Grande do Sul' },
  { id: 'RO', title: 'Rondônia' },
  { id: 'RR', title: 'Roraima' },
  { id: 'SC', title: 'Santa Catarina' },
  { id: 'SP', title: 'São Paulo' },
  { id: 'SE', title: 'Sergipe' },
  { id: 'TO', title: 'Tocantins' }
];

export default function FormEleicoes() {
  const dispatch = useDispatch();
  const perfil = useSelector((state) => state.usuario.perfil);

  const [admin, setAdmin] = useState(perfil.admin);
  const [inicioCadastro, setInicioCadastro] = useState(false);
  const [editCadastro, setEditCadastro] = useState(false);
  const [whatsapp, setWhatsapp] = useState('');
  const [celular, setCelular] = useState('');
  const [recado, setRecado] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [titulo, setTitulo] = useState('');
  const [titulo_doc, setTitulo_doc] = useState('');
  const [cnh_doc, setCnh_doc] = useState('');
  const [renavam_doc, setRenavam_doc] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [cadastro, setCadastro] = useState(false);
  const [cadastroRealizado, setCadastroRealizado] = useState(false);
  const [dominio, setDominio] = useState('');

  async function loadEleitor() {
    try {
      const response = await api.get('eleitor');
      console.log('eleitor', response.data);
      const newResponse = response.data;
      setWhatsapp(response.data.whatsapp)
      setCelular(response.data.numero_ligacao)
      setRecado(response.data.numero_parente)
      setCpf(response.data.cpf)
      setCep(response.data.cep)
      setTitulo(response.data.titulo)
      newResponse.nascimento = newResponse.nascimento.split('T')[0];
      setInitialData(newResponse);
      response.data && setCadastroRealizado(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleTituloDoc(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id } = response.data;

    setTitulo_doc(id);
  }

  async function handleCnhDoc(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id } = response.data;

    setCnh_doc(id);
  }

  async function handleRenavamDoc(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id } = response.data;

    setRenavam_doc(id);
  }

  async function handleSubmit(data, { resetForm }) {
    setLoading(true);
    const newData = data;

    newData.whatsapp = whatsapp;
    newData.celular = celular;
    newData.recado = recado;
    newData.cpf = cpf;
    newData.cep = cep;
    newData.titulo = titulo;
    if (titulo_doc) newData.titulo_doc = titulo_doc;
    if (cnh_doc) newData.cnh_doc = cnh_doc;
    if (renavam_doc) newData.renavam_doc = renavam_doc;
    newData.client = perfil.email.split('@')[1].split('.')[0];

    console.log('newData', newData);

    try {
      await api.post('eleitores', newData);

      toast.success(
        'Cadastro realizado com sucesso.'
      );
    } catch (error) {
      toast.error('Erro ao realizar o cadastro. Tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  const mascaraCelular = (numero) => {
    // Remove qualquer caractere que não seja um dígito
    const numeroLimpo = numero.replace(/\D/g, '');

    // Aplica a máscara
    const parte1 = numeroLimpo.substring(0, 2); // Código de área
    const parte2 = numeroLimpo.substring(2, 7); // Primeiros 5 dígitos do número
    const parte3 = numeroLimpo.substring(7, 11); // Últimos 4 dígitos do número

    // Retorna no formato "91 99999-9999"
    return `${parte1} ${parte2}-${parte3}`;
  };

  const mascaraTitulo = (valor) => {
    // Remove qualquer caractere que não seja um número
    valor = valor.replace(/\D/g, '');

    // Limita o comprimento máximo da entrada para 12 caracteres
    valor = valor.substring(0, 12);

    // Aplica a máscara
    let valorFormatado = '';
    if (valor.length > 0) {
      valorFormatado += valor.substring(0, 4);
    }
    if (valor.length > 4) {
      valorFormatado += ' ' + valor.substring(4, 8);
    }
    if (valor.length > 8) {
      valorFormatado += ' ' + valor.substring(8, 12);
    }

    return valorFormatado;
  };

  const mascaraCPF = (valor) => {
    // Remove qualquer caractere que não seja um número
    valor = valor.replace(/\D/g, '');

    // Limita o comprimento máximo da entrada para 11 caracteres
    valor = valor.substring(0, 11);

    // Aplica a máscara
    let valorFormatado = '';
    if (valor.length > 0) {
      valorFormatado += valor.substring(0, 3);
    }
    if (valor.length > 3) {
      valorFormatado += '.' + valor.substring(3, 6);
    }
    if (valor.length > 6) {
      valorFormatado += '.' + valor.substring(6, 9);
    }
    if (valor.length > 9) {
      valorFormatado += '-' + valor.substring(9, 11);
    }

    return valorFormatado;
  };

  const mascaraCEP = (valor) => {
    // Remove qualquer caractere que não seja um número
    valor = valor.replace(/\D/g, '');

    // Limita o comprimento máximo da entrada para 8 caracteres
    valor = valor.substring(0, 8);

    // Aplica a máscara
    let valorFormatado = '';
    if (valor.length > 0) {
      valorFormatado += valor.substring(0, 5);
    }
    if (valor.length > 5) {
      valorFormatado += '-' + valor.substring(5, 8);
    }

    return valorFormatado;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`https://www.tafechado.org.br?email=${perfil.email}`);

      toast.success(
        'Seu código foi copiado para a área de transferência.'
      );
    } catch (err) {
      console.log('Falha ao copiar o texto', err);
    }
  };

  const handleChange = (e, tipo) => {
    const valor = e.target.value;
    const valorFormatado = tipo === 'cpf' ? mascaraCPF(valor) : tipo === 'cep' ? mascaraCEP(valor) : tipo === 'celular' || tipo === 'whatsapp' ? mascaraCelular(valor) : mascaraTitulo(valor);
    tipo === 'whatsapp' && setWhatsapp(valorFormatado);
    tipo === 'celular' && setCelular(valorFormatado);
    tipo === 'recado' && setRecado(valorFormatado);
    tipo === 'cpf' && setCpf(valorFormatado);
    tipo === 'cep' && setCep(valorFormatado);
    tipo === 'titulo' && setTitulo(valorFormatado);
  };

  const criarPDF = async () => {
    var meupdf = document.getElementById('pdfHtml').innerHTML;
    // CRIA UM OBJETO WINDOW
    var win = window.open('', '', 'height=867,width=613');
    // win
    await win.document.write('<html><head>');
    await win.document.write('<title>tafechado.org.br</title>');   // <title> CABEÇALHO DO PDF.
    await win.document.write('</head>');
    await win.document.write('<body>');
    await win.document.write(`<a width='100%' height='100%' href='https://www.tafechado.org.br?email=${perfil.email}' target='_blank'>`);
    await win.document.write("<img width='100%' height='100%' src='https://tafechado.org.br/static/media/colaborador.b15a6368.png' />");
    await win.document.write('</a>');
    await win.document.write('</body></html>');
    await win.document.close(); 	                                         // FECHA A JANELA
    win.print(); 	                                         // FECHA A JANELA
                                                                // IMPRIME O CONTEUDO
  }

  useEffect(() => {
    loadEleitor();
  }, []);

  return (
    <>
      <Helmet>
        <meta property="og:site_name" content="tafechado.org.br" />
        <meta property="og:title" content="Tá Fechado" />
        <meta property="og:description" content="Junte-se ao Tá Fechado!" />
        <meta property="og:image:secure_url" itemprop="image" content="https://tafechado.org.br/static/media/colaborador.b15a6368.png" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Container>
        <section>
          {inicioCadastro || editCadastro ? (
            <div>
              <h1>Cadastro do Eleitor</h1>
              <Form
                initialData={initialData}
                onSubmit={handleSubmit}
              >
                {/* <AvatarInput name="img_id" /> */}

                <aside>
                  <Input name="nome" placeholder="NOME COMPLETO COMO NO TÍTULO DE ELEITOR" required />
                </aside>
                <aside>
                  <small>ENVIE O PRINT DO E- TITULO OU SEU TITULO DE ELEITOR FRENTE E VERSO EM PDF OU JPG</small>
                  <input
                    type="file"
                    id="titulo_doc"
                    name="titulo_doc"
                    data-file={titulo_doc}
                    onChange={handleTituloDoc}
                  />
                </aside>
                <aside>
                  <span>
                    <Input name="municipio" placeholder="MUNICÍPIO QUE NASCEU" required />
                    <Select
                      name='uf'
                      options={estados}
                      placeholder='UF'
                      style={{ width: '70px' }}
                      required
                    />
                  </span>
                  <span>
                    DATA DE NASCIMENTO<Input name="nascimento" type='date' placeholder="DATA DE NASCIMENTO" required />
                  </span>
                </aside>
                <aside>
                  <span>
                    <Input name="titulo" value={titulo} onChange={e => handleChange(e, 'titulo')} placeholder="TÍTULO DE ELEITOR" required />
                    <Input name="zona" placeholder="ZONA" type='number' style={{ width: '80px' }} required />
                    <Input name="secao" placeholder="SEÇÃO" type='number' style={{ width: '80px' }} required />
                  </span>
                </aside>
                <aside>
                  <Input name="local_votacao" placeholder="LOCAL DE VOTAÇÃO" required />
                  <span>
                    <Input name="municipio_votacao" placeholder="MUNICÍPIO" required />
                    <Select
                      name='uf_votacao'
                      options={estados}
                      placeholder='UF'
                      style={{ width: '70px' }}
                      required
                    />
                  </span>
                </aside>
                <aside>
                  <span>
                    <Input name="rg" placeholder="RG" required />
                    <Select
                      name='uf_rg'
                      options={estados}
                      placeholder='UF EXPEDIÇÃO'
                      style={{ width: '150px' }}
                      required
                    />
                  </span>
                  <Input name="cpf" value={cpf} onChange={e => handleChange(e, 'cpf')} placeholder="CPF" required />
                </aside>
                <aside>
                  <span>
                    <Input name="endereco_rua" placeholder="ENDEREÇO" required />
                    <Input name="endereco_numero" type='number' placeholder="Nº" style={{ width: '60px' }} required />
                  </span>
                </aside>
                <aside>
                  <span>
                    <Input name="endereco_complemento" placeholder="COMPLEMENTO" />
                    <Input name="endereco_bairro" placeholder="BAIRRO" required />
                    <Input name="endereco_referencia" placeholder="P. REFERÊNCIA" />
                  </span>
                </aside>
                <aside>
                  <span>
                    <Input name="endereco_municipio" placeholder="MUNICÍPIO" required />
                    <Select
                      name='endereco_uf'
                      options={estados}
                      placeholder='UF'
                      style={{ width: '70px' }}
                      required
                    />
                    <Input name="endereco_cep" value={cep} style={{ width: '130px' }} onChange={e => handleChange(e, 'cep')} placeholder="CEP" required />
                  </span>
                </aside>
                <aside>
                  VOCÊ PODE TRABALHAR EM CAMPANHA POLÍTICA?
                </aside>
                <aside>
                  <span>
                    <Check name="tipotrabalho_integral" label="TEMPO INTEGRAL" />
                  </span>
                  <span>
                    <Check name="tipotrabalho_meioperiodo" label="MEIO PERIODO" />
                  </span>
                  <span>
                    <Check name="tipotrabalho_fimdesemana" label="FIM DE SEMANA" />
                  </span>
                  <span>
                    <Check name="tipotrabalho_digital" label="NO FORMATO DIGITAL" />
                  </span>
                </aside>
                <aside>
                  EM QUAL FUNÇÃO? MARQUE SOMENTE AS OPÇÕES QUE VOCÊ TEM CONDIÇÕES DE TRABALHAR
                </aside>
                <aside>
                  <span>
                    <Check name="cargotrabalho_coordenador" label="1 - COORDENADOR(A) DE EQUIPES" />
                  </span>
                  <span>
                    <Check name="cargotrabalho_redeapoio" label="2 - REDE DE APOIO" />
                  </span>
                  <span>
                    <Check name="cargotrabalho_motorista" label="3 - MOTORISTA" />
                  </span>
                  <span>
                    <Check name="cargotrabalho_aluguelautomovel" label="ALUGAR CARRO OU MOTO" />
                  </span>
                </aside>
                <aside>
                  <small>1 - MONTAR EQUIPE DE 10 ou MAIS PESSOAS, PARA TRABALHOS DE RUA COMO BANDEIRADAS, VISITAS (formiguinha), MOBILIZAÇÃO, ETC</small>
                </aside>
                <aside>
                  <small>2 - DIVULGAÇÃO E MOBILIZAÇÃO PELO WHATSAPP, TELEGRAM, REDES SOCIAIS (youtube, Instagram, Facebook, Tik Tok, Kawai)</small>
                </aside>
                <aside>
                  <small>3 - CASO OPTE POR TRABALHAR COMO MOTORISTA, ENVIE SUA CNH DIGITAL</small>
                  <input
                    type="file"
                    id="cnh_doc"
                    name="cnh_doc"
                    data-file={cnh_doc}
                    onChange={handleCnhDoc}
                  />
                </aside>
                <aside>
                  VOCÊ POSSUI CARRO/MOTO?
                  <span>
                    <Check name="possui_carro" label="CARRO" />
                  </span>
                  <span>
                    <Check name="possui_moto" label="MOTO" />
                  </span>
                </aside>
                <aside>
                  <small>SE SIM, ENVIE O RENAVAM EM PDF OU JPG</small>
                  <input
                    type="file"
                    id="renavam_doc"
                    name="renavam_doc"
                    data-file={renavam_doc}
                    onChange={handleRenavamDoc}
                  />
                </aside>
                <aside>
                  VOCÊ QUER ALUGAR OU ADESIVAR SEUS VEÍCULOS?
                  <span>
                    <Check name="alugar_veiculo" label="ALUGAR" />
                  </span>
                  <span>
                    <Check name="adesivar_veiculo" label="ADESIVAR" />
                  </span>
                </aside>
                <aside>
                  <Input name="email" type='email' placeholder="QUAL O EMAIL QUE VOCÊ USA?" required />
                </aside>
                <aside>
                  <Input name="whatsapp" value={whatsapp} onChange={e => handleChange(e, 'whatsapp')} placeholder="QUAL SEU NÚMERO DE WHATSAPP?" required />
                </aside>
                <aside>
                  <Input name="numero_ligacao" value={celular} onChange={e => handleChange(e, 'celular')} placeholder="VOCÊ POSSUI NÚMERO SÓ PARA RECEBER LIGAÇÕES, QUAL?" />
                </aside>
                <aside>
                  <Input name="numero_parente" value={recado} onChange={e => handleChange(e, 'recado')} placeholder="VOCÊ POSSUI ALGUM NÚMERO DE PARENTE OU AMIGO PARA RECADOS?" />
                </aside>

                <button disabled={loading} type="submit">FINALIZAR CADASTRO</button>
              </Form>
            </div>
          ) : (
            <>
              {cadastroRealizado ? (
                <div>
                  <h1>ELEIÇÕES 2024</h1>
                  <h2>BANNER DE COMPARTILHAMENTO</h2>

                  <p>Para compartilhar o banner com o seu link de indicação, clique na imagem abaixo.</p>

                  <p style={{ cursor: 'pointer' }} onClick={copyToClipboard}>Ou clique aqui para copiar o seu link de compartilhamento.</p>

                  <a
                    href="#"
                    onClick={criarPDF}
                  >
                    Clique aqui
                  </a>
                  <div>
                    <a
                      href="#"
                      onClick={criarPDF}
                    >
                      <img src={colaborador} />
                    </a>
                  </div>

                </div>
              ) : (
                <div>
                  <h1>ELEIÇÕES 2024</h1>
                  <h2>FICHA DE CADASTRO</h2>

                  <p>Para preencher esse cadastro, é necessário ter em mãos os seguintes documentos:</p>

                  <ol>
                    <li>TÍTULO DE ELEITOR E PRINT DO E- TITULO PARA ENVIO COMO ANEXO - RG E CPF</li>
                    <li>SE FOR MOTORISTA, ENVIO DA CARTEIRA DE MOTORISTA DIGITAL COMO ANEXO</li>
                    <li>EMAIL QUE TENHA ACESSO</li>
                    <li>SE TIVER CARRO OU MOTO PARA ALUGUEL OU ADESIVAÇÃO, RENAVAN</li>
                    <li>ENDEREÇO COM CEP</li>

                    <button type="submit" onClick={() => setInicioCadastro(true)}>INICIAR CADASTRO</button>
                  </ol>
                </div>
              )}
            </>
          )}
        </section>
      </Container>
    </>
  );
}
