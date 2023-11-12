import styled from 'styled-components';
import { darken } from 'polished';

import trabalhe from '~/assets/trabalhe.png';
import quemsomos from '~/assets/quem-somos.jpg';
import porque from '~/assets/bg-porque.jpg';

export const Container = styled.div`
  background: #fff;
`;

export const Banner = styled.div`
  width: 100%;

  img {
    height: 100%;
    width: 100%;
  }
`;

export const Quemsomos = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: column;
  background: url(${quemsomos}) center center no-repeat;
  background-size: cover;
  width: 100%;
  padding: 10rem 15rem;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      border-left: 2px solid #ffb156;
      padding: 0 4rem;
      text-align: center;
    }

    li:first-child {
      border-left: 0;
    }
  }

  h2 {
    color: #4b4b4b;
    margin-bottom: 1rem;
    font-size: 3rem;
    font-weight: normal;
  }

  p {
    margin-bottom: 7rem;
  }

  div {
    max-width: 50rem;
  }

  @media (max-width: 720px) {
    padding: 20px;
    background: url(${quemsomos}) left center no-repeat;

    img {
      width: 80%;
    }

    div {
      width: 100%;
    }

    ul {
      flex-direction: column;

      li {
        border-left: 0 !important;
      }
    }
  }
`;

export const Aeronaves = styled.div`
  background: #161717;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 9rem;
  width: 100%;

  img {
    max-width: 100%;
    margin: auto;
  }

  h2 {
    color: #ffc37d;
    font-size: 3rem;
    font-weight: normal;
    margin-bottom: 5rem;
  }

  ul {
    display: flex;
    margin: 5rem auto;

    li {
      text-transform: uppercase;
      margin: 0 3rem;
      font-size: 2rem;

      a {
        color: #fff;
      }

      a:active {
        border-bottom: 2px solid #ffc37d;
      }
    }
  }

  @media (max-width: 720px) {
    padding: 5rem 3rem;

    ul {
      flex-direction: column;

      li {
        margin: 1rem 0rem;
      }
    }
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
