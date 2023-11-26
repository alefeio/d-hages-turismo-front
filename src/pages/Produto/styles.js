import styled from 'styled-components';
import { darken } from 'polished';

import bannerProdutos from '~/assets/banner-produtos.jpg';

export const Container = styled.div`
  background: #fff;
`;

export const Prod = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  padding: 50px;
  width: 100%;

  div {
    border-radius: 4px;
    width: 70%;

    section {
      overflow: auto;
      table {
        width: 100% !important;
        overflow-x: auto !important;
        border: 1px solid #ccc;

        td {
          border: 1px solid #ccc;
          padding: .5rem;
        }
      }
    }

    img {
      width: 100%;
      margin: 0 auto 5rem;
      border-radius: 2rem;
    }

    h1 {
      font-size: 4rem;
      text-align: center;
    }

    ul {
      margin-bottom: 10px;

      li {
        padding: 3px 0;

        strong {
          margin-top: 2rem;
        }
      }
    }

    h3 {
      margin-top: 10px;
    }

    h1 {
      margin-bottom: 25px;
    }
  }

  aside {
    background: #ffd873;
    border: 1px solid #999;
    border-radius: 4px;
    padding: 10px;
    position: ${props => props.display};
    right: 0;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
  }

  form {
    position: ${props => props.display};
    right: 0;
    bottom: 10%;
    width: 25%;
    margin: 0 auto;
    border: 1px solid #999;
    border-radius: 4px;
    padding: 10px;
    flex: 1;
    background: #ffd873;

    h2 {
      cursor: pointer;
      margin-bottom: 1rem;
    }

    input {
      background: #fff;
      border: 0;
      border-radius: 4px;
      height: 40px;
      padding: 0 15px;
      margin: 0 0 10px;
      width: 100%;

      &::placeholder {
        color: rgba(0, 0, 0, 0.7);
      }
    }

    textarea {
      background: #fff;
      border: 0;
      border-radius: 4px;
      height: 100px;
      padding: 10px 15px;
      margin: 0 0 10px;
      width: 100%;

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
      margin: 5px 0 0;
      height: 44px;
      background: #333;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      width: 100%;

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

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px;

    aside {
      position: fixed;
    }

    form {
      width: 100%;
      position: fixed;
    }

    div {
      padding: 0;
      margin: 0;
      width: 100%;
    }
  }
`;

export const Banner = styled.div`
  height: 15vh;
  width: 100%;
  background: url(${props => props.imagem}) no-repeat center center;
  background-size: cover;
`;

export const Barra = styled.div`
  display: block;
  background: #000;
  display: flex;
  align-items: center;
  padding: 1rem 3rem;
  color: #fff;

  ul {
    display: flex;
  }

  ul li {
    margin: 2px;
    padding: 5px 2px;
  }

  ul li a {
    color: #fff;
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
