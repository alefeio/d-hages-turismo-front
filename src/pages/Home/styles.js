import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

import sorrisos from '~/assets/sorrisos.jpeg';

export const Container = styled.div`
  background: ${({ state }) => `#${state?.bg_fundo}`};
  overflow: hidden;

  h1, h2, h3, h4, h5, h6, p, li, strong, a, input, button, span, textarea {
    font-family: ${({ state }) => state?.font_serifa ? "'Source Serif 4', serif" : "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"} !important;
  }
`;

const breatheAnimation = keyframes`
  0% { height: 100%; width: 100%; margin: 0; }
  50% { height: 104%; width: 104%; margin: -2% 0 0 -2%; }
  100% { height: 100%; width: 100%; margin: 0; }
`;

export const Banner = styled.div`
  width: 100%;
  height: ${({ state }) => `${state?.banner_h}vh`};
  position: relative;
  overflow: hidden !important;

  section {
    position: absolute;
    left: 0;
    top: 40%;
    width: 100%;
    text-align: center;
    opacity: .9;
    color: #fff;
    display: flex;
    flex-direction: column;
    z-index: 10;

    h2 {
      font-size: 4rem;
      text-transform: uppercase;
      align-self: center;
      padding: .5rem 1rem;
      color: ${({ state }) => !state?.cor_descricaobanner ? '#fff' : `#${state?.cor_descricaobanner}`};
      background: ${({ state }) => !state?.bg_descricaobanner || state?.bg_descricaobanner === 'transparent' ? state?.bg_descricaobanner : `#${state?.bg_descricaobanner}`};
      opacity: .8;
    }

    h3 {
      align-self: center;
      padding: .3rem .7rem;
      color: ${({ state }) => !state?.cor_titulobanner ? '#fff' : `#${state?.cor_titulobanner}`};
      background: ${({ state }) => !state?.bg_titulobanner || state?.bg_titulobanner === 'transparent' ? state?.bg_titulobanner : `#${state?.bg_titulobanner}`};
      font-size: 2rem;
      text-transform: uppercase;
      padding: .5rem;
    }

    p {
      margin-bottom: .5rem;
      background: ${({ state }) => `#${state?.primary_color}`};
      color: ${({ state }) => `#${state.textbutton_color}`};
      align-self: center;
      padding: .5rem 1rem;
      border-radius: 4px;

      @media(max-width: 600px) {
        font-size: 1.4rem;
      }
    }

    &.news {
      top: 80%;

      @media(max-width: 600px) {
        top: 70%;
      }
    }
  }

  div {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    img {
      height: 100%;
      width: 100%;
      /* animation-name: ${breatheAnimation};
      animation-duration: 12s;
      animation-direction: alternate;
      animation-iteration-count: infinite; */
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: fill;
    }
  }

  @media(max-width: 600px) {
    height: ${({ state }) => `${state?.banner_h / 1.5}vh`};

    section {
      h2 {
        font-size: 2rem;
      }

      h3 {
        font-size: 1.5rem;
      }
    }
  }
`;

export const WhatsApp = styled.div`
  position: fixed;
  right: 5%;
  bottom: 0;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 1rem;
  background: #fff;
  border-radius: 20px 20px 0 0;
  padding: 1rem;
  background: #ffd873 ;
  box-shadow: 2px 20px 20px rgba(0, 0, 0, 0.2);

  img {
    width: 40px;
  }

  input {
    border: 0;
    width: 100%;
    padding: 1rem;
    border-radius: 30px;
  }
  z-index: 10000000000000;

  @media(max-width: 600px) {
    width: 65%;
  }
`;

export const Quemsomos = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  max-width: 1300px;
  padding: 5rem;
  margin: auto;
  color: ${({ client }) => `#${client?.cor_textosite}`};

  h1 {
    color: ${({ client }) => `#${client?.cor_titulosite}`};
    border-bottom: 2px solid #ffb156;
    margin-bottom: 1rem;
    align-self: flex-start;
    padding: 0 2rem .5rem 0;
    font-size: 2.5rem;
    text-transform: uppercase;
  }

  p {
    font-size: 1.8rem;
  }

  h2 {
    color: ${({ client }) => `#${client?.cor_titulosite}`};
    border-bottom: 2px solid #ffb156;
    margin-top: 1rem;
    align-self: flex-start;
    padding: 0 2rem .5rem 0;
    font-size: 3rem;
  }

  ol {
    margin-left: 2rem;

    li {
      font-size: 1.7rem;
    }
  }

  ul {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    gap: 5rem;
    padding-left: 1rem;
    margin-top: 3rem;

    h2 {
      color: #4b4b4b;
      border-bottom: 2px solid #ffb156;
      margin-bottom: 1rem;
      align-self: flex-start;
      padding: 0 2rem .5rem 0;
    }

    li {
      padding: .5rem 0;
      color: #000;
    }
  }

  div {
    display: flex;
    gap: 5rem;

    section {
      width: 30%;
      text-align: center;

      img {
        width: 100%;
        border-radius: 0 50px;
        margin: 0 0 1rem;
      }

      video {
        width: 100%;
        border-radius: 50px 0;
      }
    }

    div {
      display: flex;
      flex: 1;
      gap: 1rem;
      flex-direction: column;

      h2 {
        font-size: 3rem !important;
        color: red !important;
      }
    }
  }

  @media (max-width: 600px) {
    padding: 20px;
    background: none;

    img {
      width: 80%;
    }

    p {
      font-size: 2rem;
    }

    div {
      width: 100%;
      flex-direction: column;

      section {
        width: 100%;

        video {
          height: 50vh;
        }
      }
    }

    ul {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 0;
      margin-top: 3rem;
      padding-left: 0;

      li {
        border-left: 0 !important;
        padding: 1rem 0;
      }
    }
  }
`;
export const Equipe = styled.div`
  width: 100%;
  background: #f9f4ec;
  margin: 5rem auto;
  color: ${({ client }) => `#${client?.cor_textosite}`};

  article {
    max-width: 1300px;
    margin: auto;
    padding: 5rem;

    h1 {
      color: #4b4b4b;
      font-size: 3rem;
      font-weight: normal;
      margin-bottom: 2rem;
      text-align: center;
    }

    p {
      font-size: 1.7rem;
    }

    h2 {
      color: ${({ client }) => `#${client?.cor_titulosite}`};
      border-bottom: 2px solid #ffb156;
      margin: 1rem 0;
      padding: 0 2rem .5rem;
    }

    h3 {
      margin: 1rem 2rem;
    }

    p {
      margin: 1rem 2rem;
    }

    ol {
      margin-left: 2rem;

      li {
        font-size: 1.7rem;
      }
    }

    div {
      display: flex;
      margin: 2rem 0;

      section {
        width: 100%;
        text-align: center;

        img {
          width: 100%;
          border-radius: 0 50px;
        }

        video {
          width: 100%;
          border-radius: 50px 0;
        }
      }

      span {
        display: flex;
        flex: 1;
        gap: 1rem;
        flex-direction: column;
      }

      &:last-child {
        h2 {
          text-align: right;
        }
      }
    }
  }

  @media (max-width: 600px) {
    padding: 20px;
    background: none;

    article {
      padding: 0;
    }

    img {
      width: 80%;
    }

    p {
      font-size: 2rem;
    }

    div {
      width: 100%;
      flex-direction: column;

      section {
        width: 100%;

        video {
          height: 50vh;
        }
      }

      &:last-child {
        flex-direction: column-reverse;
        text-align: left;
      }
    }

    ul {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 0;
      margin-top: 3rem;
      padding-left: 0;

      li {
        border-left: 0 !important;
        padding: 1rem 0;
      }
    }
  }
`;

export const Depoimentos = styled.div`
  background: #000;
  text-align: center;
  width: 100%;

  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 1300px;
    padding: 10rem 0;
    margin: auto;

    h2 {
      color: #ffd873;
      font-size: 3rem;
      font-weight: normal;
      text-align: center;
      margin-bottom: 2rem;
    }

    span {
      font-size: 1.7rem;
      padding-bottom: 5rem;
      color: #fff;
    }

    h3 {
      color: #ffd873;
      font-size: 2rem;
      font-weight: normal;
      margin: 5rem 0;
    }

    div {
      width: 100%;
      display: flex;
      align-items: baseline;
      justify-content: space-around;
      gap: 2rem;

      img {
        width: 100%;
      }

      video {
        width: 100%;
      }
    }

    p {
      font-size: 2rem;
      margin-top: 5rem;
      a {
        color: #fff;
      }
    }
  }

  @media (max-width: 720px) {
    overflow: hidden;
    padding: 0;
  }
`;

export const Produtos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  padding: 5rem;
  margin: auto;
  text-align: center;

  div {
    a {
      margin: 1rem;
      font-size: 2rem;
      color: orange;
      font-weight: bold;
    }

    @media (max-width: 600px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 1rem 3rem;
    background: transparent;
    align-self: center;
    border: 5px solid ${({ client }) => `#${client?.primary_color}`};
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.3);
    border-radius: 3rem;
    padding: 1rem;

    > input {
      border: 0;
      font-size: 2rem;
      background: transparent;
    }

    svg {
      cursor: pointer;
    }
  }

  aside {
    margin-top: 5rem;

    a {
      margin: 2rem;
      padding: 1rem 2rem;
      border: 0;
      background: #000;
      color: #fff;
      align-self: center;
      border-radius: 2rem;
    }
  }

  h2 {
    color: #4b4b4b;
    font-size: 3rem;
    font-weight: normal;
    margin-bottom: 2rem;
  }

  h3 {
    margin: 1rem;
  }

  p {
    font-size: 1.7rem;
  }

  @media (max-width: 600px) {
    padding: 5rem 1rem;
  }
`;

export const ListaProdutos = styled.ul`
  display: grid;
  grid-template-columns: repeat(${({ client }) =>
    client.servicos ? client.qtdlinhaservicos
      : client.produtos ? client.qtdlinhaprodutos
        : client.pacotes ? client.qtd_linhapacotes
          : 3
  }, 1fr);
  grid-gap: 5rem;
  text-align: left;

  li {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border-radius: ${({ client }) => `${client?.border_radius}rem`};
    box-shadow: ${({ client }) => client?.sombra ? '1px 1px 10px #999' : 'none'};

    section {
      padding: 1rem;
      flex: 1;

      span {
        font-weight: bold;
      }

      small {
        font-size: 1.7rem;
      }

      h2 {
        color: ${({ client }) => client?.cor_titulosite};
        margin: 1rem;
        text-align: center;
        font-weight: bold;
      }

      h3 {
        margin-top: .5rem;
        font-weight: normal;
      }
    }

    a {
      background: ${({ client }) => `#${client?.primary_color}`};
      color: ${({ client }) => `#${client.textbutton_color}`};
      border: 0;
      overflow: hidden;
      margin-top: auto;
      display: flex;
      align-items: center;
      border-radius: ${({ client }) => `${client?.border_radius}rem`};

      img {
        width: 100%;
        height: ${({ client }) => client?.altura_foto === 0 ? 'auto' : `${client?.altura_foto}px`};
      }

      div {
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        background: ${({ client }) => `#${client.primary_color}`};
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }

      &:hover {
        background: ${({ client }) => darken(0.3, `#${client?.primary_color}`)};
        color: #fff;
      }
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 5rem;

    li {
      margin: 1rem;
    }
  }
`;

export const ListaBlog = styled.ul`
  display: grid;
  grid-template-columns: repeat(${({ client }) => client.qtd_linhablog}, 1fr);
  grid-gap: 5rem;
  text-align: left;

  li {
    overflow: hidden;
    display: flex;
    flex-direction: ${({ client }) => client?.qtd_linhablog === 1 ? 'row' : 'column'};
    align-items: center;
    justify-content: flex-start;

    a {
      color: ${({ client }) => `#${client.textbutton_color}`};
      border: 0;
      overflow: hidden;
      max-width: ${({ client }) => client?.qtd_linhablog === 1 ? '40%' : '100%'};
      width: 100%;

      img {
        border-radius: ${({ client }) => `${client?.border_radius}rem`};
        height: ${({ client }) => client?.altura_foto === 0 ? 'auto' : `${client?.altura_foto}px`};
        width: 100%;
      }

      div {
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        background: ${({ client }) => `#${client.primary_color}`};
      }

      span {
          display: flex;
          align-items: center;
          justify-content: center;
        }
    }

    section {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 1rem;

      span {
        font-weight: bold;
      }

      small {
        font-size: 1.7rem;
      }

      h2 {
        color: ${({ client }) => client?.cor_titulosite};
      }

      h3 {
      }

      a {
        align-self: flex-start;
        max-width: 100%;
        padding: 2rem;

        span {
          margin: 1rem 0;
          border-radius: ${({ client }) => `${client?.border_radius}rem`};
          background: ${({ client }) => `#${client?.primary_color}`};
          padding: 1rem;
        }

        &:hover {
          background: none;
        }
      }
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 5rem;
    margin: 0 1rem;

    li {
      flex-direction: column;

      a {
        width: 100%;
        height: auto;
        max-width: 100%;

        img {
          width: 100%;
        }
      }
    }
  }
`;


export const Porque = styled.div`
  background: url(${({ bg }) => bg}) center center no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10rem 15rem;

  img {
    margin: 2rem;
    max-width: 90%;
  }

  h2 {
    color: #ffd873;
    font-size: 3.5rem;
    font-weight: normal;
  }

  ul {
    margin: 3rem 0;

    li {
      color: #fff;
      font-size: 2.5rem;
      border-top: 1px solid #bbb;
      padding: 1.5rem 7rem 1.5rem 0;
    }

    li:first-child {
      border-top: 0;
    }
  }

  @media (max-width: 720px) {
    padding: 5rem 3rem;

    h2 {
      font-size: 3rem;
    }

    ul {
      flex-direction: column;
      margin: 2rem 5rem;

      li:first-child {
        border-top: 0;
      }
    }
  }
`;

export const Ondeestamos = styled.div`
  iframe {
    width: 100%;
    height: 50vh;
  }
`;

export const Trabalhe = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  background: ${({ client }) => client === 'dhagesturismo' ? '#000' : darken(0.3, '#aee7cf')};
  padding: 10rem;

  h2, p {
    color: ${({ client }) => client === 'dhagesturismo' ? '#fff' : darken(0.7, '#aee7cf')};
  }

  form {
    width: 35%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(255, 255, 255, 1);
      border: 0;
      height: 30px;
      padding: 0 15px;
      color: #111;
      margin: 0 0 1rem;

      &::placeholder {
        color: rgba(0, 0, 0, 0.7);
      }
    }

    textarea {
      background: rgba(255, 255, 255, 1);
      border: 0;
      height: 100px;
      padding: 10px 15px;
      color: #111;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.7);
      }
    }

    span {
      color: red;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      height: 44px;
      background: ${({ client }) => client === 'dhagesturismo' ? '#333' : darken(0.4, '#aee7cf')};
      font-weight: bold;
      color: #fff;
      border: 0;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.5, '#aee7cf')};
      }
    }

    a {
      color: #4c4738;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }

  @media (max-width: 720px) {
    flex-direction: column;
    padding: 10rem 5rem;

    form {
      width: 100%;
    }

    img {
      max-width: 60%;
      margin: 5rem;
    }
  }
`;

export const Email = styled.div`
  width: 20% !important;
  align-self: center !important;
  background: #fff;
  border-radius: 30px;
  padding: .2rem;

  input {
    border: 0;
    width: 100%;
    padding: .5rem 1rem;
    border-radius: 30px;

    @media(max-width: 600px) {
      font-size: 1.4rem;
    }
  }

  button {
    border: 0;
    background: ${({ client }) => `#${client?.primary_color}`};
    color: ${({ client }) => `#${client.textbutton_color}`};
    padding: 1rem;
    border-radius: 30px;

    @media(max-width: 600px) {
      font-size: 1.4rem;
    }
  }

  @media(max-width: 600px) {
    width: 50% !important;
  }
`;
