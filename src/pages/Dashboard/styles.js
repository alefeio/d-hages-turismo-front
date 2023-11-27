import styled from 'styled-components';
import { darken } from 'polished';

import bannerProdutos from '~/assets/banner-produtos.jpg';

export const Container = styled.div`
  section {
    padding: 5rem;
    display: flex;

    > ul {
      width: 20%;
      margin-bottom: 3rem;

      li {
        margin: .1rem 3rem .1rem 0;
        background: #fff;
        box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.3);

        a {
          padding: 1rem;
          display: block;
          color: #000;
        }
      }
    }

    div {
      flex: 1;

      div {
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 2rem;
      }
    }

    form {
      width: 50%;
      margin: auto;

      div {
        border-radius: 4px;
        margin: .5rem 0 2rem;
      }

      input {
        border: 1px solid #ccc;
        border-radius: 4px;
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
        border-radius: 4px;
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
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.09, 'red')};
      }
    }
  }

  @media(max-width: 600px) {
    section {
      flex-direction: column;

      > ul {
        width: 100%;

        li {
          margin: .1rem 1rem;
        }
      }

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
