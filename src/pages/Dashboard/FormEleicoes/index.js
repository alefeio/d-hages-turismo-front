import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Choice, Form, Input, Select } from '@rocketseat/unform';

import { logout } from '~/store/modules/auth/actions';
import { updatePerfilRequest } from '~/store/modules/usuario/actions';

import copy from '~/assets/copy.png';

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

  console.log('perfil', perfil)


  function handleSubmit(data) {
    data.admin = admin;

    console.log('data', data)
    data.admin === true || data.admin === false && dispatch(updatePerfilRequest(data));
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.href.split('//')[1].split('/')[0]}?email=${perfil.email}`);
      console.log('Texto copiado para a área de transferência');
    } catch (err) {
      console.log('Falha ao copiar o texto', err);
    }
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
              <li>TÍTULO DE ELEITOR E PRINT DO E- TITULO PARA ENVIO COMO ANEXO- RG E CPF</li>
              <li>SE FOR MOTORISTA ENVIO DA CARTEIRA DE MOTORISTA DIGITAL COMO ANEXO</li>
              <li>EMAIL QUE TENHA ACESSO</li>
              <li>SE TIVER CARRO OU MOTO PARA ALUGUEL OU ADESIVAÇÃO RENAVAN</li>
              <li>ENDEREÇO COM CEP</li>

              <button type="submit" onClick={() => setInicioCadastro(true)}>Iniciar cadastro</button>
            </ol>
          </div>
        ) : (
          <Form
            // initialData={perfil}
            onSubmit={handleSubmit}
          >
            {/* <AvatarInput name="img_id" /> */}

            <Input name="nome" placeholder="NOME COMPLETO COMO NO TÍTULO DE ELEITOR" />
            <aside>
              <Input name="municipio" placeholder="MUNICÍPIO QUE NASCEU" />
              <Select
                name='uf'
                options={estados}
                placeholder='UF'
                style={{ width: '70px' }} 
              />
              <Input name="nascimento" placeholder="DATA DE NASCIMENTO" />
            </aside>
            <aside>
              <Input name="titulo" placeholder="TÍTULO" />
              <Input name="zona" placeholder="ZONA" style={{ width: '70px' }} />
              <Input name="secao" placeholder="SEÇÃO" style={{ width: '100px' }} />
            </aside>
            <aside>
              <Input name="local_votacao" placeholder="LOCAL DE VOTAÇÃO" />
              <Input name="municipio_votacao" placeholder="MUNICÍPIO" />
              <Select
                name='uf_votacao'
                options={estados}
                placeholder='UF'
                style={{ width: '70px' }} 
              />
            </aside>
            <aside>
              <Input name="rg" placeholder="RG" />
              <Select
                name='uf_rg_expedicao'
                options={estados}
                placeholder='UF EXPEDIÇÃO'
                style={{ width: '150px' }} 
              />
              <Input name="cpf" placeholder="CPF" />
            </aside>
            <aside>
              <Input name="endereco" placeholder="ENDEREÇO" />
              <Input name="numero" placeholder="Nº" style={{ width: '50px' }}  />
              <Input name="complemento" placeholder="COMPLEMENTO" />
              <Input name="bairro" placeholder="BAIRRO" />
            </aside>
            <aside>
              <Input name="ponto_referencia" placeholder="P. REFERÊNCIA" />
              <Input name="municipio" placeholder="MUNICÍPIO" />
              <Select
                name='uf_endereco'
                options={estados}
                placeholder='UF'
                style={{ width: '70px' }} 
              />
              <Input name="cep" placeholder="CEP" />
            </aside>
            <aside>
              VOCÊ PODE TRABALHAR EM CAMPANHA POLÍTICA?
              <Choice
                name="pode_trabalhar_fisicamente"
                options={[{ value: 'sim', label: 'Sim' }, { value: 'nao', label: 'Não' }]}
              />
            </aside>

            <button type="submit">Atualizar perfil</button>
          </Form>
        )}
      </section>
    </Container>
  );
}
