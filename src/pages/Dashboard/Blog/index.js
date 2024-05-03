import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdEdit, MdDelete } from 'react-icons/md';

import { useSelector } from 'react-redux';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Container, Banner, Barra, Produtos, ListaProdutos } from './styles';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import api from '~/services/api';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';
import SiteContext from '~/context/site';
import { removerEspacosEAcentos } from '~/util/removerEspacosEAcentos';

export default function AdminBlog() {
  const [texto, setTexto] = useState('<p></p>');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [produtoEdit, setProdutoEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dominio, setDominio] = useState('');

  const { state, loadSite } = useContext(SiteContext);

  const perfil = useSelector((state) => state.usuario.perfil);

  const editorRef = useRef(null);

  async function loadProdutos() {
    const response = await api.get(`blog?client=${dominio}`);

    const { blog } = response.data;

    console.log(`blog: ${JSON.stringify(response.data)}`);

    setProdutos(blog);
  }

  async function loadProduto(url, edit = true) {

    const response = await api.get(`blog/${url}`);
    
    console.log(response.data);
    
    edit && setProdutoEdit(response.data.id);

    setInitialData(response.data);

    setFile(response.data.imagem.id);
    setPreview(response.data.imagem.url);

    setTexto(response.data.texto);
    // setProduto(response.data);
    // setImagem(response.data.imagem.url);
  }

  async function deleteProdutos(id) {
    const response = await api.delete(`blog/${id}`);

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

  const handleChange = useCallback((editorState) => {
    console.log('editorState', editorState);
    setTexto(editorState);
  }, []);

  async function handleSubmit(data, { resetForm }) {
    setLoading(true);
    const newData = data;
    newData.url = removerEspacosEAcentos(newData.titulo);
    newData.texto = texto;
    newData.img_id = file;
    newData.client = perfil.email.split('@')[1].split('.')[0];
    console.log('newData', newData);

    try {
      await api.post('blog', newData);
      loadProdutos();

      toast.success(
        'Registro efetuado com sucesso.'
      );

      setInitialData({});
      setTexto('');
      setFile('');
      setPreview('');
      setProdutoEdit(null);
    } catch (error) {
      toast.error('Erro ao criar o registro. Tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(data, { resetForm }) {
    setLoading(true);
    const newData = data;
    newData.url = removerEspacosEAcentos(newData.titulo);
    newData.texto = texto;
    newData.img_id = file;
    newData.client = perfil.email.split('@')[1].split('.')[0];
    console.log('newData', newData);

    try {
      await api.put(`blog/${produtoEdit}`, newData);
      loadProdutos();

      toast.success(
        'O registro foi atualizado com sucesso.'
      );

      setInitialData({});
      setTexto('');
      setFile('');
      setPreview('');
      setProdutoEdit(null);
    } catch (error) {
      toast.error('Erro ao atualizar o registro. Tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  function onContentStateChange(contentState) {
    console.log('contentState', { contentState })
    console.log('contentState2', contentState)
    setTexto({
      contentState,
    });
  };

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
          <li>Admin {state?.blog}</li>
        </ul>
      </Barra>
      <section id="top">
        <h2>Administrar {state?.blog}</h2>
        {!produtoEdit ? <h3>Inserir novo registro</h3> : <h3>Editar registro</h3>}
        <Form onSubmit={!produtoEdit ? handleSubmit : handleUpdate} initialData={initialData}>
          {preview && <img src={preview} />}
          {/* <AvatarInput name="img_id" /> */}

          <input
            type="file"
            id="imagem"
            data-file={file}
            onChange={handleFile}
          />

          Título: <Input name="titulo" placeholder="Qual o destino?" />
          <br />

          Descrição: <Input name="descricao" placeholder="Qual o destino?" />
          <br />
          Texto:

          <CKEditor
            editor={ClassicEditor}
            data={texto}
            onReady={editor => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              handleChange(editor.getData());
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
          />
          <br />

          Autor: <Input name="autor" placeholder="Autor do artigo" />
          <br />

          <button disabled={loading} id='salvar' type="submit">{!produtoEdit ? 'Salvar' : 'Editar'}</button>
        </Form>
      </section>
      <section>
        <Produtos id="blog">
          <h2>{state?.blog}</h2>
          <ListaProdutos>
            {produtos.map((p) => (
              <li key={p.id}>
                <Link to={`roteiros/${p.id}`}>
                  <img src={p.imagem.url} alt={p.nome} />
                </Link>
                <section>
                  <h2>{p.titulo}</h2>
                </section>
                <a href='#top' onClick={() => loadProduto(p.url)}>
                  <div>
                    <MdEdit size={16} color="#FFF" />
                  </div>
                  <span>Editar</span>
                </a>
                <a href='#top' onClick={() => loadProduto(p.url, false)}>
                  <div>
                    <MdEdit size={16} color="#FFF" />
                  </div>
                  <span>Usar modelo</span>
                </a>
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
