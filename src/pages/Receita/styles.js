import styled from 'styled-components';

import bannerReceitas from '~/assets/banner-receitas.jpg';

export const Container = styled.div`
  background: #fff;
`;

export const Prod = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 50px;

  @media (max-width: 720px) {
    flex-direction: column;
    padding: 10px;

    div {
      padding: 0;
      margin: 0;

      img {
        width: 100%;
      }
    }
  }

  div {
    padding: 50px;
    border-radius: 4px;

    img {
      height: 100%;
      width: 100%;
      margin: 50px auto;
    }

    h1 {
      font-size: 24px;
      margin-bottom: 25px;
    }

    ul {
      margin-bottom: 10px;

      li {
        padding: 3px;
      }
    }

    h2 {
      margin-bottom: 25px;
    }
  }

  div:first-child {
    background: none;
    margin: 0;
    padding: 0;
  }
`;

export const Banner = styled.div`
  height: 271px;
  width: 100%;
  background: url(${bannerReceitas}) no-repeat center center;
  background-size: cover;
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
