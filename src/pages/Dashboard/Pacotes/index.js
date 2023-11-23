import React, { useState, useRef, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdEdit, MdDelete } from 'react-icons/md';

import { Editor } from '@tinymce/tinymce-react';

import { Container, Banner, Barra, Produtos, ListaProdutos } from './styles';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import api from '~/services/api';

export default function AdminPacotes() {
  const [descricao, setDescricao] = useState('');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [initialData, setInitialData] = useState({});
  const [produtoEdit, setProdutoEdit] = useState(null);

  const editorRef = useRef(null);

  async function loadProdutos() {
    const response = await api.get('pacotes');

    const { pacotes } = response.data;

    console.log(`pacotes: ${JSON.stringify(response.data)}`);

    setProdutos(pacotes);
  }

  async function loadProduto(id, edit = true) {
    edit && setProdutoEdit(id);

    const response = await api.get(`pacotes/${id}`);

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

  function handleDescricao() {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setDescricao(editorRef.current.getContent());
    }
  }

  async function handleSubmit(data, { resetForm }) {
    const newData = data;
    newData.valoravista = Number(data.valoravista);
    newData.valoraprazo = Number(data.valoraprazo);
    newData.parcelas = Number(data.parcelas);
    newData.descricao = descricao;
    newData.img_id = file
    console.log(newData);

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
    }
  }

  async function handleUpdate(data, { resetForm }) {
    const newData = data;
    newData.valoravista = Number(data.valoravista);
    newData.valoraprazo = Number(data.valoraprazo);
    newData.parcelas = Number(data.parcelas);
    newData.descricao = descricao;
    newData.img_id = file
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

  useEffect(() => {
    !produtos.length && loadProdutos();
  }, [produtos]);

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
          <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            apiKey='q2k7mnykdpxkjfh1t2g31fdzpozt2qge1mokj8czggv8il5y'
            init={{
              height: 500,
              plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
            }}
            initialValue={descricao}
            onChange={handleDescricao}
          />

          <button type="submit">{!produtoEdit ? 'Salvar' : 'Editar'}</button>
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
