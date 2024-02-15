import React, { useState, useRef, useEffect, useCallback } from 'react';
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

export default function AdminServicos() {
  const [descricao, setDescricao] = useState('<p></p>');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [realizadas, setRealizadas] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [produtoEdit, setProdutoEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dominio, setDominio] = useState('');

  const perfil = useSelector((state) => state.usuario.perfil);

  const editorRef = useRef(null);

  async function loadProdutos() {
    const response = await api.get(`servicos?client=${dominio}`);

    const { pacotes } = response.data;

    console.log(`pacotes: ${JSON.stringify(response.data)}`);

    setProdutos(pacotes);
  }

  async function loadProduto(id, edit = true) {
    edit && setProdutoEdit(id);

    const response = await api.get(`servicos/nome/${id}`);

    console.log(response.data);

    setInitialData({
      nome: response.data.nome
    });

    setFile(response.data.imagem.id);
    setPreview(response.data.imagem.url);

    setDescricao(response.data.descricao);
    // setProduto(response.data);
    // setImagem(response.data.imagem.url);
  }

  async function deleteProdutos(id) {
    const response = await api.delete(`servicos/${id}`);

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
    setDescricao(editorState);
  }, []);

  async function handleSubmit(data, { resetForm }) {
    setLoading(true);
    const newData = data;
    newData.descricao = descricao;
    newData.img_id = file;
    newData.client = perfil.email.split('@')[1].split('.')[0];
    console.log('newData', newData);

    try {
      await api.post('servicos', newData);
      loadProdutos();

      toast.success(
        'O produto foi criado com sucesso.'
      );

      setInitialData({});
      setDescricao('');
      setFile('');
      setPreview('');
      setProdutoEdit(null);
    } catch (error) {
      toast.error('Erro ao criar o produto. Tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(data, { resetForm }) {
    const newData = data;
    newData.valoravista = dominio === 'iopa' ? 0 : Number(data.valoravista);
    newData.valoraprazo = dominio === 'iopa' ? 0 : Number(data.valoraprazo);
    newData.parcelas = dominio === 'iopa' ? 0 : Number(data.parcelas);
    if (dominio === 'iopa') newData.saida = new Date();
    if (dominio === 'iopa') newData.retorno = new Date();
    newData.descricao = descricao;
    newData.img_id = file;
    newData.client = perfil.email.split('@')[1].split('.')[0];
    console.log(newData);

    try {
      await api.put(`servicos/${produtoEdit}`, newData);
      loadProdutos();

      toast.success(
        'O produto foi atualizado com sucesso.'
      );

      setInitialData({});
      setDescricao('');
      setFile('');
      setPreview('');
      setProdutoEdit(null);
    } catch (error) {
      toast.error('Erro ao atualizar o produto. Tente novamente!');
    }
  }

  function onContentStateChange(contentState) {
    console.log('contentState', { contentState })
    console.log('contentState2', contentState)
    setDescricao({
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
          <li>Admin Serviços</li>
        </ul>
      </Barra>
      <section id="top">
        <h2>Administrar Serviços</h2>
        {!produtoEdit ? <h3>Inserir novo serviço</h3> : <h3>Editar serviço</h3>}
        <Form onSubmit={!produtoEdit ? handleSubmit : handleUpdate} initialData={initialData}>
          {preview && <img src={preview} />}
          {/* <AvatarInput name="img_id" /> */}

          <input
            type="file"
            id="imagem"
            data-file={file}
            onChange={handleFile}
          />

          Nome: <Input name="nome" placeholder="Qual o destino?" />
          <br />
          Descrição:

          <CKEditor
            editor={ClassicEditor}
            data={descricao}
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

          <button disabled={loading} id='salvar' type="submit">{!produtoEdit ? 'Salvar' : 'Editar'}</button>
        </Form>
      </section>
      <section>
        <Produtos id="pacotes">
          <h2>Serviços</h2>
          <ListaProdutos>
            {produtos.map((p) => (
              <li key={p.id}>
                <Link to={`roteiros/${p.id}`}>
                  <img src={p.imagem.url} alt={p.nome} />
                </Link>
                <section>
                  <h2>{p.nome}</h2>
                </section>
                <a href='#top' onClick={() => loadProduto(p.id)}>
                  <div>
                    <MdEdit size={16} color="#FFF" />
                  </div>
                  <span>Editar</span>
                </a>
                <a href='#top' onClick={() => loadProduto(p.id, false)}>
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
