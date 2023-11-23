import styled from 'styled-components';
import { darken } from 'polished';

import bannerProdutos from '~/assets/banner-produtos.jpg';

export const Container = styled.div`
  section {
    padding: 5rem;

    h2 {
      margin-bottom: 2rem;
    }

    h3 {
      text-align: center;
    }

    form {
      width: 70%;
      margin: auto;

      div {
        border-radius: 2rem;
        margin: .5rem 0 2rem;
      }

      img {
        max-width: 100%;
      }

      input {
        border: 1px solid #ccc;
        border-radius: 2rem;
        padding: 1rem;
        margin: .5rem 0 2rem;
        width: 100%;
      }

      button {
        margin: 1rem 0;
        padding: 1rem;
        background: #000;
        color: #fff;
        border: 0;
        border-radius: 2rem;
        transition: background 0.2s;

        &:hover {
          background: ${darken(0.07, '#4c4738')};
        }
      }
    }

    > button {
      width: 100%;
      margin: 10px auto 0;
      height: 44px;
      background: red;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 2rem;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.09, 'red')};
      }
    }
  }

  @media(max-width: 600px) {
    section {
      form {
        width: 100%;
      }
    }
  }
`;

export const Banner = styled.div`
  height: 15vh;
  width: 100%;
  background: #000;
`;

export const Barra = styled.div`
  display: block;
  background: #e6e6e6;
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 80px;

  @media (max-width: 720px) {
    padding: 10px;
  }

  ul {
    display: flex;
  }

  ul li {
    margin: 2px;
    padding: 5px 2px;
  }

  ul li a {
    color: #4d4d4d;
  }
`;

export const Produtos = styled.div`
  margin: 10rem;

  h2 {
    color: #4b4b4b;
    font-size: 3rem;
    font-weight: normal;
    margin-bottom: 5rem;
    text-align: center;
  }

  @media(max-width: 600px) {
    margin: 5rem 2rem;
  }
`;

export const ListaProdutos = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2rem;

  li {
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.3);
    border-radius: 2rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    img {
      width: 100%;
    }

    section {
      padding: 1rem;
      flex: 1;

      h2 {
        font-size: 2.5rem;
        line-height: 20px;
        color: #333;
        margin: 2rem;
        text-align: center;
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
      transition: background 0.2s;
      margin-top: 1rem;

      div {
        display: flex;
        align-items: center;
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
  }
`;
