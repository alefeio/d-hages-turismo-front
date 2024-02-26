import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdEdit, MdDelete } from 'react-icons/md';

import { useDispatch, useSelector } from 'react-redux';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Container, Banner, Barra, Produtos, ListaProdutos } from './styles';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

import api from '~/services/api';
import { extrairDominioDaURLAtual } from '~/util/extrairDominioDaUrlAtual';
import SiteContext from '~/context/site';

export default function AdminSite() {
  const dispatch = useDispatch();
  const [descricao, setDescricao] = useState('<p></p>');
  const [rodape_texto, setRodape_texto] = useState('<p></p>');
  const [file, setFile] = useState('');
  const [logo, setLogo] = useState('');
  const [preview, setPreview] = useState('');
  const [previewLogo, setPreviewLogo] = useState('');
  const [initialData, setInitialData] = useState({});
  const [produtoEdit, setProdutoEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewBanner, setViewBanner] = useState(false);
  const [textoBanner, setTextoBanner] = useState(false);
  const [dominio, setDominio] = useState('');
  const [fontSerifa, setFontSerifa] = useState(false);
  const [sombra, setSombra] = useState(false);

  const { state, loadSite } = useContext(SiteContext);

  const perfil = useSelector((state) => state.usuario.perfil);

  async function loadProduto() {
    try {
      const response = await api.get(`site?client=${dominio}`);

      console.log(state);

      setProdutoEdit(state.id);

      setInitialData(state);

      setFile(state.imagem.id);
      setPreview(state.imagem.url);

      setLogo(state.logo.id);
      setPreviewLogo(state.logo.url);

      setDescricao(state.descricao);
      setRodape_texto(state.rodape_texto);

      setViewBanner(state.banner);
      setTextoBanner(state.textonobanner);

      setFontSerifa(state.font_serifa);
      setSombra(state.sombra);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogo(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setLogo(id);
    setPreviewLogo(url);
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

  const handleChangeRodape = useCallback((editorState) => {
    console.log('editorState', editorState);
    setRodape_texto(editorState);
  }, []);

  async function handleSubmit(data, { resetForm }) {
    setLoading(true);
    const newData = data;
    newData.banner = viewBanner;
    newData.textonobanner = textoBanner;
    newData.descricao = descricao;
    newData.rodape_texto = rodape_texto;
    newData.img_id = file;
    newData.logo_id = logo;
    newData.font_serifa = fontSerifa;
    newData.sombra = sombra;
    newData.client = perfil.email.split('@')[1].split('.')[0];

    console.log('newData', newData);

    try {
      await api.post('site', newData);
      loadSite();

      toast.success(
        'Dados atualizados com sucesso.'
      );
    } catch (error) {
      toast.error('Erro ao atualizar os dados. Tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(data, { resetForm }) {
    setLoading(true);
    const newData = data;
    newData.banner = viewBanner;
    newData.textonobanner = textoBanner;
    newData.descricao = descricao;
    newData.rodape_texto = rodape_texto;
    newData.img_id = file;
    newData.logo_id = logo;
    newData.font_serifa = fontSerifa;
    newData.sombra = sombra;
    newData.client = perfil.email.split('@')[1].split('.')[0];

    console.log(newData);

    try {
      await api.put(`site/${produtoEdit}`, newData);
      loadSite();

      toast.success(
        'Dados atualizados com sucesso.'
      );
    } catch (error) {
      toast.error('Erro ao atualizar os dados. Tente novamente!');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProduto();

    console.log('state', state);
  }, [dominio, state]);

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
          <li>Admin Site</li>
        </ul>
      </Barra>
      <section id="top">
        <h2>Administrar Site</h2>
        <Form onSubmit={!produtoEdit ? handleSubmit : handleUpdate} initialData={initialData}>
          <span>
            <aside>
              {previewLogo && <img src={previewLogo} />}
              Logomarca: <input
                type="file"
                id="logo"
                data-file={logo}
                onChange={handleLogo}
              />
            </aside>
          </span>
          <span>
            Title (SEO): <Input name="title" placeholder="Insira palavras-chave de sua área de atuação" />
          </span>
          <span>
            <aside>
              <span>
                Cor do menu:
              </span>
              <span><Input name="primary_color" placeholder="ffffff" /></span>
            </aside>
            <aside>
              <span>Cor do rodapé:</span>
              <span><Input name="second_color" placeholder="ffffff" /></span>
            </aside>
            <aside>
              <span>Cor de títulos no site:</span>
              <span><Input name="cor_titulosite" placeholder="ffffff" /></span>
            </aside>
            <aside>
              <span>Cor de textos no site:</span>
              <span><Input name="cor_textosite" placeholder="ffffff" /></span>
            </aside>
            <aside>
              <span>Cor de fundo:</span>
              <span><Input name="bg_fundo" placeholder="ffffff" /></span>
            </aside>
          </span>
          <span>
            <aside>
              <span>Cor do texto: menu e botões:</span>
              <span><Input name="textbutton_color" placeholder="ffffff" /></span>
            </aside>
            <aside>
              <span>Arredondamento da borda:</span>
              <span><Input name="border_radius" placeholder="Digite apenas números" type='number' /></span>
            </aside>
            <aside>
              <span>Altura das fotos:</span>
              <span><Input name="altura_foto" placeholder="Digite apenas números" type='number' /></span>
            </aside>
            <aside>
              <span>Fonte<br />com serifa?</span>
              <span>
                <Input type='radio' name="font_serifa" onChange={() => setFontSerifa(true)} checked={!!fontSerifa} /> Sim
              </span>
              <span>
                <Input type='radio' name="font_serifa" onChange={() => setFontSerifa(false)} checked={!fontSerifa} /> Não
              </span>
            </aside>
            <aside>
              <span>Sombra?</span>
              <span>
                <Input type='radio' name="sombra" onChange={() => setSombra(true)} checked={!!sombra} /> Sim
              </span>
              <span>
                <Input type='radio' name="sombra" onChange={() => setSombra(false)} checked={!sombra} /> Não
              </span>
            </aside>
          </span>
          <hr />
          <span>
            <aside>
              <span>
                Banner:
              </span>
              <span>
                <Input type='radio' name="banner" onChange={() => setViewBanner(true)} checked={!!viewBanner} /> Sim
              </span>
              <span>
                <Input type='radio' name="banner" onChange={() => setViewBanner(false)} checked={!viewBanner} /> Não
              </span>
              {viewBanner && <><span>
                Texto<br />no banner?
              </span>
                <span>
                  <Input type='radio' name="textonobanner" onChange={() => setTextoBanner(true)} checked={!!textoBanner} /> Sim
                </span>
                <span>
                  <Input type='radio' name="textonobanner" onChange={() => setTextoBanner(false)} checked={!textoBanner} /> Não
                </span></>}
            </aside>
            {viewBanner && <><aside>
              <span>
                Altura do menu:
              </span>
              <span><Input name="altura_menu" placeholder="Digite apenas números" type='number' /> %</span>
              <span>
                Altura do banner:
              </span>
              <span><Input name="banner_h" placeholder="Digite apenas números" type='number' /> %</span>
            </aside>
              {textoBanner && <>
                <aside>
                  <span>
                    Título do banner:
                  </span>
                  <span><Input name="titulobanner" placeholder="" /></span>
                  <span>
                    Subtítulo do banner:
                  </span>
                  <span><Input name="descricaobanner" placeholder="" /></span>
                </aside>
                <aside>
                  <span>
                    Cor Título banner:
                  </span>
                  <span><Input name="cor_titulobanner" placeholder="" /></span>
                  <span>
                    Cor Subtítulo banner:
                  </span>
                  <span><Input name="cor_descricaobanner" placeholder="" /></span>
                </aside>
                <aside>
                  <span>
                    Bg Título banner:
                  </span>
                  <span><Input name="bg_titulobanner" placeholder="" /></span>
                  <span>
                    Bg Subtítulo banner:
                  </span>
                  <span><Input name="bg_descricaobanner" placeholder="" /></span>
                </aside>
              </>}
            </>}
          </span>
          <hr />
          <span>
            <aside>
              {(
                preview.split('.')[preview.split('.').length - 1] === 'webm'
                || preview.split('.')[preview.split('.').length - 1] === 'mp4'
                || preview.split('.')[preview.split('.').length - 1] === 'mov'
                || preview.split('.')[preview.split('.').length - 1] === 'wmv'
                || preview.split('.')[preview.split('.').length - 1] === 'avi'
                || preview.split('.')[preview.split('.').length - 1] === 'html5'
              )
                ? (
                  <video loop="loop" controls>
                    <source src={preview} type="video/mp4" />
                    <object data="">
                      <embed src={preview} />
                    </object>
                  </video>
                ) : (
                  <img src={preview} />
                )
              }
              Foto da empresa: <input
                type="file"
                id="imagem"
                data-file={file}
                onChange={handleFile}
              />
            </aside>
          </span>
          <span>
            Nome da empresa: <Input name="nome" placeholder="" />
          </span>
          <span>
            Descrição da empresa:
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
          </span>
          <hr />
          <span>
            {initialData.servicos && <aside>
              <span>
                Itens por linha:
              </span>
              <span>
                <Input name="qtdlinhaprodutos" placeholder="Digite apenas números" type='number' />
              </span>
            </aside>}
            <aside>
              <span>
                Se houver produtos, digite o título: <Input name="produtos" placeholder="Título de Produtos" />
              </span>
            </aside>
          </span>
          <span>
            {initialData.servicos && <aside>
              <span>
                Itens por linha:
              </span>
              <span>
                <Input name="qtdlinhaservicos" placeholder="Digite apenas números" type='number' />
              </span>
            </aside>}
            <aside>
              <span>
                Se houver serviços, digite o título: <Input name="servicos" placeholder="Título de Serviços" />
              </span>
            </aside>
          </span>
          <span>
            {initialData.blog && <aside>
              <span>
                Itens por linha:
              </span>
              <span>
                <Input name="qtd_linhablog" placeholder="Digite apenas números" type='number' />
              </span>
            </aside>}
            <aside>
              <span>
                Se houver blog, digite o título: <Input name="blog" placeholder="Título de Blog" />
              </span>
            </aside>
          </span>
          <span>
            {initialData.pacotes && <aside>
              <span>
                Itens por linha:
              </span>
              <span>
                <Input name="qtd_linhapacotes" placeholder="Digite apenas números" type='number' />
              </span>
            </aside>}
            <aside>
              <span>
                Se houver pacotes, digite o título: <Input name="pacotes" placeholder="Título de Blog" />
              </span>
            </aside>
          </span>
          <span>
            {initialData.pacotes && <aside>
              <span>
                Itens por linha:
              </span>
              <span>
                <Input name="qtdlinhadepoimentos" placeholder="Digite apenas números" type='number' />
              </span>
            </aside>}
            <aside>
              <span>
                Se houver depoimentos, digite o título: <Input name="depoimentos" placeholder="Título de Depoimentos" />
              </span>
            </aside>
          </span>
          <hr />
          <span>
            Endereço no Google Maps: <Input name="mapa" placeholder="Endereço no mapa" />
          </span>
          <span>
            Título do rodapé: <Input name="rodape_titulo" placeholder="" />
          </span>
          <span>
            Texto do rodapé:
            <CKEditor
              editor={ClassicEditor}
              data={rodape_texto}
              onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                handleChangeRodape(editor.getData());
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
            />
          </span>
          <span>
            Whatsapp: <Input name="whatsapp" placeholder="DDD+numero" type='number' />
          </span>
          <span>
            Instagram: <Input name="instagram" placeholder="Ex: https://instagram.com/usuario" />
          </span>
          <span>
            Facebook: <Input name="facebook" placeholder="Ex: https://facebook.com/usuario" />
          </span>

          <button disabled={loading} id='salvar' type="submit">Salvar</button>
        </Form>
      </section>
    </Container>
  );
}
