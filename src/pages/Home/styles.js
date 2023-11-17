import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

import trabalhe from '~/assets/trabalhe.png';
import quemsomos from '~/assets/home/onibus.png';
import porque from '~/assets/bg-porque.jpg';

export const Container = styled.div`
  background: #fff;
`;

const breatheAnimation = keyframes`
  0% { height: 100%; width: 100%; margin: 0; }
  50% { height: 104%; width: 104%; margin: -2% 0 0 -2%; }
  100% { height: 100%; width: 100%; margin: 0; }
`;

export const Banner = styled.div`
  width: 100vw;
  height: 85vh;
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
      color: #ffd873;
      font-size: 2rem;
      text-transform: uppercase;
    }

    p {
      margin-bottom: 1rem;
      background: #000;
      align-self: center;
      padding: .5rem 1rem;
      border-radius: 4px;
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
    height: 30vh;

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
  /* background: url(${quemsomos}) no-repeat; */
  background-size: 55%;
  width: 100%;
  padding: 5rem 10rem;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      padding: 2rem;

      h2 {
        border-bottom: 2px solid #ffb156;
        margin-bottom: 2rem;
      }
    }

    li:first-child {
      border-left: 0;
    }
  }

  h1 {
    color: #4b4b4b;
    margin: 2rem 0;
    font-size: 3rem;
    font-weight: normal;
  }

  p {
    font-size: 1.5rem;
    color: #777;
    margin-bottom: 1.5rem;
  }

  div {
    display: flex;
    gap: 5rem;

    section {
      width: 40%;

      img {
        width: 100%;
        border-radius: 0 50px;
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
      }
    }

    ul {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      margin-top: 3rem;

      li {
        border-left: 0 !important;
        padding: 2rem 0;
      }
    }
  }
`;

export const Depoimentos = styled.div`
  background: #000;
  text-align: center;
  padding: 9rem;
  width: 100%;

  h2 {
    color: #ffd873;
    font-size: 3rem;
    font-weight: normal;
    margin-bottom: 5rem;
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

  @media (max-width: 720px) {
    padding: 5rem 3rem;
  }
`;

export const Produtos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15rem auto;
  color: #4b4b4b;
  text-align: center;

  h2 {
    font-size: 3rem;
    font-weight: normal;
  }

  ul {
    display: flex;
    margin: 10rem;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      font-size: 2rem;
      border-left: 1px solid #d8d8d8;
      padding: 3rem 1rem;
      width: 20%;

      img {
        max-width: 6rem;
        margin-bottom: 3rem;
      }
    }

    li:first-child {
      border-left: 0;
    }
  }

  @media (max-width: 720px) {
    margin: 5rem 3rem;

    ul {
      flex-direction: column;
      margin: 2rem 5rem;

      li {
        margin: 1rem;
        padding: 3rem 1rem 1rem;
        width: 100%;
        border-left: 0;
        border-top: 1px solid #d8d8d8;
      }

      li:first-child {
        border-top: 0;
      }
    }
  }
`;

export const Porque = styled.div`
  background: url(${porque}) center center no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10rem 15rem;

  img {
    margin: 2rem;
    max-width: 90%;
  }

  h2 {
    color: #ffc37d;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #4b4b4b;
  text-align: center;
  padding: 10rem;

  img {
    max-width: 70%;
    margin: 7rem 0;
  }

  h1 {
    font-size: 4rem;
    font-weight: normal;
  }

  h2 {
    font-size: 3.5rem;
  }

  h3 {
    border: 2px solid #ffb877;
    border-radius: 25px;
    padding: 1rem 5rem;
    margin-top: 3rem;
    font-size: 2.5rem;
  }

  @media (max-width: 720px) {
    padding: 5rem 2rem;

    h1 {
      font-size: 3rem;
    }

    h3 {
      padding: 1rem 2rem;
      margin-top: 3rem;
      font-size: 1.5rem;
    }
  }
`;

export const Trabalhe = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  background: #000;
  padding: 10rem;

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
      margin: 0 0 10px;
      text-transform: uppercase;

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
      text-transform: uppercase;

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
    text-align: center;
    padding: 5px;

    form {
      width: 80%;
    }

    img {
      max-width: 60%;
      margin: 5rem;
    }
  }
`;

export const Email = styled.div`
  width: 30% !important;
  align-self: center !important;
  background: #fff;
  border-radius: 10px;
  padding: .5rem;

  input {
    border: 0;
    width: 100%;
    padding: 1rem;
  }

  button {
    border: 0;
    background: #000;
    color: #fff;
    padding: .5rem 1rem;
    border-radius: 7px;
  }

  @media(max-width: 600px) {
    width: 65% !important;
  }
`;
