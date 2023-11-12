import styled from 'styled-components';
import { darken } from 'polished';

import bannerProdutos from '~/assets/banner-produtos.jpg';

export const Container = styled.div`
  background: #fff;
`;

export const Banner = styled.div`
  height: 271px;
  display: block;
  background: url(${bannerProdutos}) no-repeat center center;
  background-size: cover;
`;

export const Barra = styled.div`
  height: 70px;
  display: block;
  background: #e6e6e6;
  display: flex;
  align-items: center;
  padding: 0 80px;

  ul {
    display: flex;
  }

  ul li a {
    margin: 5px;
    padding: 10px;
    color: #4d4d4d;
  }
`;

export const ListaProdutos = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  padding: 50px;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
      max-height: 150px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    a {
      background: #644d25;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;
      display: flex;
      align-items: center;
      transition: background 0.2s;

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
        background: ${darken(0.07, '#644d25')};
      }
    }
  }
`;
