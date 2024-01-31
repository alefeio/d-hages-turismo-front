import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdEdit, MdDelete } from 'react-icons/md';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Container, Banner, Barra, Produtos, ListaProdutos } from './styles';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import api from '~/services/api';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';

export default function AdminPacotes() {
  const [descricao, setDescricao] = useState('<p></p>');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [realizadas, setRealizadas] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [produtoEdit, setProdutoEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dominio, setDominio] = useState('');

  const editorRef = useRef(null);

  async function loadProdutos() {
    const response = await api.get(`todas?client=${dominio}`);

    const { pacotes } = response.data;

    console.log(`pacotes: ${JSON.stringify(response.data)}`);

    setProdutos(pacotes);
  }

  async function loadProduto(id, edit = true) {
    edit && setProdutoEdit(id);

    const response = await api.get(`pacotes/nome/${id}`);

    console.log(response.data);

    setInitialData({
      nome: response.data.nome,
      saida: response.data.saida.split('T')[0],
      retorno: response.data.retorno.split('T')[0],
      valoravista: response.data.valoravista,
      valoraprazo: response.data.valoraprazo,
      parcelas: response.data.parcelas
    });

    setFile(response.data.imagem.id);
    setPreview(response.data.imagem.url);

    setDescricao(response.data.descricao);
    // setProduto(response.data);
    // setImagem(response.data.imagem.url);
  }

  async function deleteProdutos(id) {
    const response = await api.delete(`pacotes/${id}`);

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
    newData.valoravista = Number(data.valoravista);
    newData.valoraprazo = Number(data.valoraprazo);
    newData.parcelas = Number(data.parcelas);
    newData.descricao = descricao;
    newData.img_id = file;
    newData.client = dominio;
    console.log('newData', newData);

    try {
      await api.post('pacotes', newData);
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
    newData.valoravista = Number(data.valoravista);
    newData.valoraprazo = Number(data.valoraprazo);
    newData.parcelas = Number(data.parcelas);
    newData.descricao = descricao;
    newData.img_id = file;
    newData.client = dominio;
    console.log(newData);

    try {
      await api.put(`pacotes/${produtoEdit}`, newData);
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
          <li>
            Admin Roteiros
          </li>
        </ul>
      </Barra>
      <section id="top">
        <h2>Administrar Roteiros</h2>
        {!produtoEdit ? <h3>Inserir novo pacote</h3> : <h3>Editar pacote</h3>}
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
          Data saída: <Input name="saida" type="date" placeholder="Data saída" />
          <br />
          Data retorno: <Input name="retorno" type="date" placeholder="Data retorno" />
          <br />
          Valor à vista <Input name="valoravista" type="number" placeholder="Apenas números" />
          <br />
          Valor a prazo <Input name="valoraprazo" type="number" placeholder="Apenas números" />
          <br />
          Número de parcelas <Input name="parcelas" type="number" placeholder="Quantas parcelas?" />
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
          <h2>ROTEIROS</h2>
          <ListaProdutos>
            {produtos.map((p) => (
              <li key={p.id}>
                <Link to={`roteiros/${p.id}`}>
                  <img src={p.imagem.url} alt={p.nome} />
                </Link>
                <section>
                  <h2>{p.nome}</h2>
                  <h3>Saída: {p.saida.split('T')[0].split('-').reverse().join('/')}</h3>
                  <h3>Retorno: {p.retorno.split('T')[0].split('-').reverse().join('/')}</h3>
                  <h3>Valor por pessoa:</h3>
                  <p>À vista: R$ {p.valoravista}</p>
                  {p.valoraprazo && <p>{p.parcelas}x no cartão: R$ {p.valoraprazo}</p>}
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
