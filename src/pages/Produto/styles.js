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
  gap: 7rem;
  margin: 3rem;

  div {
    border-radius: 4px;
    width: 100%;

    section {
      font-size: 1.8rem;
      margin-bottom: 2rem;

      p, li {
        margin: 1rem 0;
      }

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
      border-radius: ${({ client }) => `${client?.border_radius}rem`};
      width: 40%;
      float: left;
      margin: 0 3rem 1rem 0;
    }

    span {
      flex: 1;
      margin: 2rem;
    }

    h1, h2, h3, p, li, strong {
      font-family: ${({ client }) => client?.font_serifa ? "'Source Serif 4', serif" : "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"};

      a {
        color: ${({ client }) => `#${client?.cor_link}`};
      }
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
  }

  aside {
    width: 5%;
    
    nav {
      img {
        border-radius: ${({ client }) => `${client?.border_radius}rem`};
        width: 100%;
      }
    }

    div {      
      margin: 0 0 3rem;
    }
  }

  form {
    position: fixed;
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
      width: 100%;
    }

    form {
      width: 100%;
      position: fixed;
    }

    div {
      width: 100%;

      img {
        float: none;
        margin: 1rem;
        width: 80%;
        margin: auto;
        text-align: center;
      }
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
