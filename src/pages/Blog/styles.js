import styled from 'styled-components';
import { darken } from 'polished';

import bannerProdutos from '~/assets/banner-produtos.jpg';

export const Container = styled.div`
  background: #fff;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  margin: 50px 0;
`;

export const ListaProdutos = styled.ul`
  padding: 0 50px;

  @media (max-width: 720px) {
  }

  li {
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    overflow: hidden;
    text-align: left !important;

    img {
      width: 100%;
      max-width: 800px;
      transition: 1s;

      &:hover {
        opacity: 0.8;
      }
    }

    a:first-child {
      align-self: center;
    }

    a {
      display: flex;
      flex-direction: column;
      align-items: initial;
      color: #000;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 2rem;
      transition: background 0.2s;

      /* span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      } */

      &:hover {
        text-decoration: underline;
      }

      h2 {
        font-size: 24px !important;
        text-transform: uppercase !important;
      }

      span {
        margin: 1rem 0 0 !important;
      }
    }
  }
`;

export const Submenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 3rem;
  text-align: center;
  text-transform: uppercase;

  h4 {
    background: #000;
    color: #fff;
    width: 100%;
    padding: 1rem 6rem;
    font-weight: normal;
  }

  ul {
    display: flex;
    flex-direction: column;

    li {
      padding: 1.8rem 6rem;
      border-bottom: 1px solid #ddd;

      a {
        color: #000;
        display: block;
      }
    }
  }
`;
