import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
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

export const ListaPontos = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;

  li {
    border: 1px solid #efefef;
    background: #fff;
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.3);
    border-radius: 2rem;
    padding: 20px;
    overflow: auto;

    img {
      align-self: center;
      width: 250px;
      height: 250px;
      transition: 1s;

      &:hover {
        width: 350px;
        height: 350px;
      }
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 10px;
    }

    a {
      color: green;
      border: 0;
      font-weight: bold;
      /* transition: background 0.2s; */

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

      /* &:hover {
        background: ${darken(0.07, '#644d25')};
      } */
    }

    button {
      background: #000;
      color: #fff;
      border: 0;
      border-radius: 1rem;
      margin: 2rem 0 1rem;
      align-self: center;
      padding: .7rem 2rem;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
