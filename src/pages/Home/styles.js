import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

import porque from '~/assets/home/onibus.jpg';

export const Container = styled.div`
  background: #fff;
`;

const breatheAnimation = keyframes`
  0% { height: 100%; width: 100%; margin: 0; }
  50% { height: 104%; width: 104%; margin: -2% 0 0 -2%; }
  100% { height: 100%; width: 100%; margin: 0; }
`;

export const Banner = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden !important;

  section {
    position: absolute;
    z-index: 100000000;
    left: 0;
    top: 40%;
    width: 100%;
    text-align: center;
    opacity: .9;
    color: #fff;
    display: flex;
    flex-direction: column;

    h2 {
      font-size: 5rem;
      text-transform: uppercase;
    }

    h3 {
      align-self: center;
      padding: .3rem .7rem;
      color: black;
      background: #ffd873;
      font-size: 2rem;
      text-transform: uppercase;
    }

    p {
      margin-bottom: .5rem;
      background: #000;
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
      animation-name: ${breatheAnimation};
      animation-duration: 12s;
      animation-direction: alternate;
      animation-iteration-count: infinite;
    }
    video {
      height: 100%;
      width: 100%;
      object-fit: fill;
    }
  }

  @media(max-width: 600px) {
    height: 40vh;

    section {
      h2 {
        font-size: 3rem;
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
  padding: 10rem 0;
  margin: auto;

  h1 {
    color: #4b4b4b;
    border-bottom: 2px solid #ffb156;
    margin-bottom: 1rem;
    align-self: flex-start;
    padding: 0 2rem .5rem 0;
    font-size: 2.5rem;
    text-transform: uppercase;
  }

  p {
    font-size: 1.7rem;
    color: #000;
  }

  h2 {
    color: #4b4b4b;
    border-bottom: 2px solid #ffb156;
    margin-top: 1rem;
    align-self: flex-start;
    padding: 0 2rem .5rem 0;
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
    justify-content: space-between;
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
      width: 20%;

      img {
        width: 100%;
        border-radius: 0 50px;
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
      margin-top: 5rem;
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
  padding: 10rem 0;
  margin: auto;
  text-align: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      margin: 1rem 1rem 2rem;
      font-size: 2rem;
      color: orange;
      font-weight: bold;
    }
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 3rem;
    background: #fff;
    align-self: center;
    border: 5px solid orange;
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
    text-align: center;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.7rem;
    margin: 0 2rem 5rem;
  }
`;

export const ListaProdutos = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 7rem;
  text-align: left;

  li {
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.3);
    border-radius: 2rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;

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
        font-size: 2.5rem;
        line-height: 20px;
        color: #333;
        margin: 2rem;
        text-align: center;
        font-weight: bold;
        color: orange
      }

      h3 {
        margin-top: .5rem;
        font-weight: normal;
      }
    }

    a {
      background: #000;
      color: #fff;
      border: 0;
      overflow: hidden;
      margin-top: auto;
      display: flex;
      align-items: center;
      border-radius: 2rem;

      img {
        width: 100%;
      }

      div {
        width: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }

      &:hover {
        background: ${darken(0.07, '#000')};
      }
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 5rem;

    li {
      margin: 0 2rem;
    }
  }
`;


export const Porque = styled.div`
  background: url(${porque}) center center no-repeat;
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
    height: 100vh;

  }
`;

export const Trabalhe = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  background: #000;
  padding: 10rem;

  h2, p {
    color: #fff;
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
      background: #333;
      font-weight: bold;
      color: #fff;
      border: 0;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.2, '#333')};
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
    background: #000;
    color: #fff;
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
