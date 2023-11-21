import styled from 'styled-components';
import { darken } from 'polished';

import bannerProdutos from '~/assets/banner-produtos.jpg';

export const Container = styled.div`
  background: #fff;
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

export const Produtos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  padding: 10rem 0;
  margin: auto;
  text-align: center;

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
    margin-bottom: 5rem;
    text-align: center;
  }
`;

export const ListaProdutos = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 7rem;
  text-align: left !important;

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

      h2 {
        font-size: 2.5rem;
        line-height: 20px;
        margin: 2rem 0 2rem;
        text-align: center;
        font-weight: bold;
        color: orange;
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
      margin: 0 !important;
      margin-top: auto;
      display: flex;
      align-items: center;
      border-radius: 0%;
      padding: 0;
      color: #fff;
      align-self: auto;
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
