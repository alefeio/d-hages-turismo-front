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
    background: #fff;
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

export const ListaBlog = styled.ul`
  display: grid;
  grid-template-columns: repeat(${({ client }) => client.qtd_linhablog}, 1fr);
  grid-gap: 5rem;
  text-align: left;

  li {
    overflow: hidden;
    display: flex;
    flex-direction: ${({ client }) => client?.qtd_linhablog === 1 ? 'row' : 'column'};

    section {
      flex: 1;
      padding: 1rem;

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
      border-radius: 1rem;
      max-width: ${({ client }) => client?.qtd_linhablog === 1 ? '40%' : '100%'};

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
        background: ${({ client }) => `#${client.primary_color}`};
      }

      span {
          display: flex;
          align-items: center;
          justify-content: center;  
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
      flex-direction: column;

      a {
        max-width: 100%;
      }
    }
  }
`;
