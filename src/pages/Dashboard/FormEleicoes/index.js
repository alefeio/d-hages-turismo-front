import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Choice, Form, Input, Select } from '@rocketseat/unform';

import { logout } from '~/store/modules/auth/actions';
import { updatePerfilRequest } from '~/store/modules/usuario/actions';

// import AvatarInput from './AvatarInput';

import { Container } from './styles';

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
  const [whatsapp, setWhatsapp] = useState('');
  const [celular, setCelular] = useState('');
  const [recado, setRecado] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');

  console.log('perfil', perfil)

  function handleSubmit(data) {
    data.admin = admin;

    console.log('data', data)
    data.admin === true || data.admin === false && dispatch(updatePerfilRequest(data));
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

  const handleChange = (e, tipo) => {
    const valor = e.target.value;
    const valorFormatado = tipo === 'cpf' ? mascaraCPF(valor) : tipo === 'cep' ? mascaraCEP(valor) : mascaraCelular(valor);
    tipo === 'whatsapp' && setWhatsapp(valorFormatado);
    tipo === 'celular' && setCelular(valorFormatado);
    tipo === 'recado' && setRecado(valorFormatado);
    tipo === 'cpf' && setCpf(valorFormatado);
    tipo === 'cep' && setCep(valorFormatado);
  };

  return (
    <Container>
      <section>
        {!inicioCadastro ? (
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
        ) : (
          <Form
            // initialData={perfil}
            onSubmit={handleSubmit}
          >
            {/* <AvatarInput name="img_id" /> */}

            <aside>
              <Input name="nome" placeholder="NOME COMPLETO COMO NO TÍTULO DE ELEITOR" required />
            </aside>
            <aside>
              <small>CLIQUE AQUI PARA ENVIAR DO PRINT DO E- TITULO OU SEU TITULO DE ELEITOR FRENTE E VERSO EM PDF</small>
            </aside>
            <aside>
              <Input name="municipio" placeholder="MUNICÍPIO QUE NASCEU" required />
              <Select
                name='uf'
                options={estados}
                placeholder='UF'
                style={{ width: '70px' }}
                required
              />
              <Input name="nascimento" type='date' placeholder="DATA DE NASCIMENTO" required />
            </aside>
            <aside>
              <Input name="titulo" placeholder="TÍTULO" required />
              <Input name="zona" placeholder="ZONA" style={{ width: '70px' }} required />
              <Input name="secao" placeholder="SEÇÃO" style={{ width: '100px' }} required />
            </aside>
            <aside>
              <Input name="local_votacao" placeholder="LOCAL DE VOTAÇÃO" required />
              <Input name="municipio_votacao" placeholder="MUNICÍPIO" required />
              <Select
                name='uf_votacao'
                options={estados}
                placeholder='UF'
                style={{ width: '70px' }}
                required
              />
            </aside>
            <aside>
              <Input name="rg" placeholder="RG" required />
              <Select
                name='uf_rg_expedicao'
                options={estados}
                placeholder='UF EXPEDIÇÃO'
                style={{ width: '150px' }}
                required
              />
              <Input name="cpf" value={cpf} onChange={e => handleChange(e, 'cpf')} placeholder="CPF" required />
            </aside>
            <aside>
              <Input name="endereco" placeholder="ENDEREÇO" required />
              <Input name="numero" type='number' placeholder="Nº" style={{ width: '60px' }} required />
              <Input name="complemento" placeholder="COMPLEMENTO" required />
              <Input name="bairro" placeholder="BAIRRO" required />
            </aside>
            <aside>
              <Input name="ponto_referencia" placeholder="P. REFERÊNCIA" required />
              <Input name="municipio" placeholder="MUNICÍPIO" required />
              <Select
                name='uf_endereco'
                options={estados}
                placeholder='UF'
                style={{ width: '70px' }}
                required
              />
              <Input name="cep" value={cep} onChange={e => handleChange(e, 'cep')} placeholder="CEP" required />
            </aside>
            <aside>
              VOCÊ PODE TRABALHAR EM CAMPANHA POLÍTICA?
            </aside>
            <aside>
              <Choice
                name="trabalhar_na_campanha"
                options={
                  [
                    { value: 'integral', label: 'TEMPO INTEGRAL' },
                    { value: 'meio_periodo', label: 'MEIO PERIODO' },
                    { value: 'fim_de_semana', label: 'FIM DE SEMANA' },
                    { value: 'digital', label: 'NO FORMATO DIGITAL' },
                  ]
                }
                multiple
                required
              />
            </aside>
            <aside>
              EM QUAL FUNÇÃO? MARQUE SOMENTE AS OPÇÕES QUE VOCÊ TEM CONDIÇÕES DE TRABALHAR
            </aside>
            <aside>
              <Choice
                name="funcao_na_campanha"
                options={
                  [
                    { value: 'coordenador', label: '1 - COORDENADOR(A) DE EQUIPES' },
                    { value: 'rede_apoio', label: '2 - REDE DE APOIO' },
                    { value: 'motorista', label: '3 - MOTORISTA' },
                    { value: 'alugar_carro_moto', label: 'ALUGAR CARRO OU MOTO' },
                  ]
                }
                multiple
                required
              />
            </aside>
            <aside>
              <small>1 - MONTAR EQUIPE DE 10 ou MAIS PESSOAS, PARA TRABALHOS DE RUA COMO BANDEIRADAS, VISITAS (formiguinha), MOBILIZAÇÃO, ETC</small>
            </aside>
            <aside>
              <small>2 - DIVULGAÇÃO E MOBILIZAÇÃO PELO WHATSAPP, TELEGRAM, REDES SOCIAIS (youtube, Instagram, Facebook, Tik Tok, Kawai)</small>
            </aside>
            <aside>
              <small>3 - CASO OPTE POR TRABALHAR COMO MOTORISTA, CLIQUE AQUI PARA ENVIAR SUA CNH DIGITAL</small>
            </aside>
            <aside>
              VOCÊ POSSUI CARRO/MOTO?
              <Choice
                name="possui_veiculo"
                options={
                  [
                    { value: 'carro', label: 'CARRO' },
                    { value: 'moto', label: 'MOTO' },
                  ]
                }
                multiple
                style={{ width: '50px' }}
                required
              />
            </aside>
            <aside>
              <small>CLIQUE AQUI PARA ENVIO DO RENAVAM EM PDF</small>
            </aside>
            <aside>
              VOCÊ QUER ALUGAR OU ADESIVAR SEUS VEÍCULOS?
              <Choice
                name="alugar_adesivar_veiculo"
                options={
                  [
                    { value: 'alugar', label: 'ALUGAR' },
                    { value: 'adesivar', label: 'ADESIVAR' },
                  ]
                }
                multiple
                style={{ width: '50px' }}
                required
              />
            </aside>
            <aside>
              <Input name="email" type='email' placeholder="QUAL O EMAIL QUE VOCÊ USA?" required />
            </aside>
            <aside>
              <Input name="whatsapp" value={whatsapp} onChange={e => handleChange(e, 'whatsapp')} placeholder="QUAL SEU NÚMERO DE WHATSAPP?" required />
            </aside>
            <aside>
              <Input name="celular" value={celular} onChange={e => handleChange(e, 'celular')} placeholder="VOCÊ POSSUI NÚMERO SÓ PARA RECEBER LIGAÇÕES, QUAL?" />
            </aside>
            <aside>
              <Input name="recado" value={recado} onChange={e => handleChange(e, 'recado')} placeholder="VOCÊ POSSUI ALGUM NÚMERO DE PARENTE OU AMIGO PARA RECADOS?" />
            </aside>

            <button type="submit">FINALIZAR CADASTRO</button>
          </Form>
        )}
      </section>
    </Container>
  );
}
