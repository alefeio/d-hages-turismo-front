import styled from 'styled-components';
import { darken } from 'polished';

import onibus from '~/assets/home/onibus.jpg';

export const Container = styled.div`
  background: #fff;
`;

export const Prod = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  div {
    padding: 50px;
    border-radius: 4px;
    width: 100%;
    text-align: center;

    iframe {
      width: 100%;
      height: 100vh;
      border: 0;
    }

    img {
      height: 80%;
      width: 80%;
      margin: 50px auto;
      border-radius: 50%;
      padding: 1rem;
      border: 1px solid #333;
    }

    h1 {
      font-size: 24px;
    }

    ul {
      margin-bottom: 10px;

      li {
        padding: 3px 0;
      }
    }

    h3 {
      margin-top: 10px;
    }

    h1 {
      margin-bottom: 25px;
    }
  }

@media (max-width: 720px) {
  flex-direction: column;
  padding: 10px;
  text-align: center;
  padding: 2rem;

  div {
    padding: 0;
    margin: 1rem 0;
    text-align: center;

    img {
      width: 50%;
    }
  }
}
`;

export const Banner = styled.div`
  height: 15vh;
  width: 100%;
  background: url(${onibus}) no-repeat center center;
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

export const Contact = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  h2 {
    font-size: 30px;
    margin-bottom: 30px;
    font-weight: normal;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      margin: 1rem;
      padding: .2em;
    }
  }

  form {
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    border: 1px solid #999;
    border-radius: 4px;
    padding: 10px;

    input {
      background: #ddd;
      border: 0;
      border-radius: 4px;
      height: 40px;
      padding: 0 15px;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.7);
      }
    }

    textarea {
      background: #ddd;
      border: 0;
      border-radius: 4px;
      height: 100px;
      padding: 10px 15px;
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
      margin: 5px 0 0;
      height: 44px;
      background: #333;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
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
    form {
      width: 100%;
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
