import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdEdit, MdDelete } from 'react-icons/md';

import { Editor } from '@tinymce/tinymce-react';

import { Container, Banner, Barra, Produtos, ListaProdutos } from './styles';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import api from '~/services/api';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';
import { useSelector } from 'react-redux';

export default function AdminBanners() {
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dominio, setDominio] = useState('');
  const [tipo, setTipo] = useState('');

  const perfil = useSelector((state) => state.usuario.perfil);

  async function loadProdutos() {
    const response = await api.get(`banners?client=${dominio}`);

    console.log(`banners: ${JSON.stringify(response.data)}`);

    setProdutos(response.data);
  }

  async function deleteProdutos(id) {
    const response = await api.delete(`banner/${id}`);

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
    console.log('data>>', data);
    const newData = {
      img_id: file,
      titulo: data.titulo,
      client: perfil.email.split('@')[1].split('.')[0],
      link: data.link,
      link_tipo: tipo
    };
    console.log('data>>', newData);

    try {
      await api.post('banner', newData);
      loadProdutos();

      toast.success(
        'O banner foi criado com sucesso.'
      );

      setFile('');
      setPreview('');
    } catch (error) {
      toast.error('Erro ao criar o banner. Tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    !produtos.length && dominio && loadProdutos();
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
            Admin Banners
          </li>
        </ul>
      </Barra>
      <section id="top">
        <h2>Administrar Banners</h2>
        <h3>Inserir novo banner</h3>
        <Form onSubmit={handleSubmit}>
          {preview && <img src={preview} />}
          {/* <AvatarInput name="img_id" /> */}
          <br /><br />
          <input
            type="file"
            id="imagem"
            data-file={file}
            onChange={handleFile}
          />
          <br /><br />
          Título: <Input name="titulo" placeholder="Título do banner" /><br /><br />

          Link: <Input name="link" placeholder="Link" /><br /><br />

          Tipo:<br />

          <div>
            <span>
              <Input type='radio' name="link_tipo" value='interno' onClick={() => setTipo('interno')} /> Interno
            </span>
            <span>
              <Input type='radio' name="link_tipo" value='externo' onClick={() => setTipo('externo')} /> Externo
            </span>
          </div>
          <button disabled={loading} type="submit">Salvar</button>
        </Form>
      </section>
      <section>
        <Produtos id="pacotes">
          <h2>BANNERS</h2>
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
                    <img src={p.imagem.url} alt={p.titulo} />
                  )
                }
                <section>
                  <h2>{p.titulo}</h2>
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
