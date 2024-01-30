import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdEdit, MdDelete } from 'react-icons/md';

import { Editor } from '@tinymce/tinymce-react';

import { Container, Banner, Barra, Produtos, ListaProdutos } from './styles';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import api from '~/services/api';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';

export default function AdminDepoimentos() {
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tipo, setTipo] = useState('');
  const [dominio, setDominio] = useState('');

  async function loadProdutos() {
    const response = await api.get(`depoimentos?client=${dominio}`);

    console.log(`depoimentos: ${JSON.stringify(response.data)}`);

    setProdutos(response.data);
  }

  async function deleteProdutos(id) {
    const response = await api.delete(`depoimento/${id}`);

    loadProdutos();
  }

  async function handleFile(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  async function handleSubmit(data, { resetForm }) {
    setLoading(true);
    const newData = data;
    newData.img_id = file;
    newData.tipo = tipo;
    newData.client = dominio;

    try {
      await api.post('depoimento', newData);
      loadProdutos();

      toast.success(
        'O depoimento foi criado com sucesso.'
      );

      setFile('');
      setPreview('');
    } catch (error) {
      toast.error('Erro ao criar o depoimento. Tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    !produtos.length && loadProdutos();
  }, [dominio]);

  useEffect(() => {
    // Chamar a função ao montar o componente
    setDominio(extrairDominioDaURLAtual());
  }, []);

  return (
    <Container>
      <Banner />
      <Barra>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>/</li>
          <li>
            Admin Depoimentos
          </li>
        </ul>
      </Barra>
      <section id="top">
        <h2>Administrar Depoimentos</h2>
        <h3>Inserir novo depoimento</h3>
        <Form onSubmit={handleSubmit}>
          {preview && <img src={preview} />}
          {/* <AvatarInput name="img_id" /> */}

          Nome: <Input name="nome" placeholder="Nome do cliente" /><br />

          Tipo:<br />
          <Input type='radio' name="tipo" value='texto' onClick={() => setTipo('texto')} /> Texto<br />
          <Input type='radio' name="tipo" value='foto' onClick={() => setTipo('foto')} /> Foto<br />
          <Input type='radio' name="tipo" value='video' onClick={() => setTipo('video')} /> Vídeo<br />

          {(tipo === 'foto' || tipo === 'video') &&
            <>
              <input
                type="file"
                id="imagem"
                data-file={file}
                onChange={handleFile}
              /><br />
            </>
          }

          {tipo === 'texto' &&
            <>
              Texto: <Input multiline name="texto" placeholder="Texto do depoimento (opcional)" className='textoDepo' /><br />
            </>
          }

          <button disabled={loading} type="submit">Salvar</button>
        </Form>
      </section>
      <section>
        <Produtos id="pacotes">
          <h2>DEPOIMENTOS</h2>
          <ListaProdutos>
            {produtos.map((p) => (
              <li key={p.id}>
                {(
                  p.imagem.url.split('.')[p.imagem.url.split('.').length - 1] === 'webm'
                  || p.imagem.url.split('.')[p.imagem.url.split('.').length - 1] === 'mp4'
                  || p.imagem.url.split('.')[p.imagem.url.split('.').length - 1] === 'mov'
                  || p.imagem.url.split('.')[p.imagem.url.split('.').length - 1] === 'wmv'
                  || p.imagem.url.split('.')[p.imagem.url.split('.').length - 1] === 'avi'
                  || p.imagem.url.split('.')[p.imagem.url.split('.').length - 1] === 'html5'
                )
                  ? (
                    <video autoplay="autoplay" loop="loop" muted>
                      <source src={p.imagem.url} type="video/mp4" />
                      <object data="">
                        <embed src={p.imagem.url} />
                      </object>
                    </video>
                  ) : (
                    <img src={p.imagem.url} alt={p.nome} />
                  )
                }
                <section>
                  <h2>{p.nome}</h2>
                  <small>{p.tipo}</small>
                  <p>{p.texto}</p>
                </section>
                <Link onClick={() => deleteProdutos(p.id)}>
                  <div>
                    <MdDelete size={16} color="#FFF" />
                  </div>
                  <span>Excluir</span>
                </Link>
              </li>
            ))}
          </ListaProdutos>
        </Produtos>
      </section>
    </Container>
  );
}
