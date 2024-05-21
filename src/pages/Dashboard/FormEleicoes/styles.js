import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  section {
    width: 100%;

    h1, h2, h3, h4 {
      text-align: center !important;
      font-size: 2rem;
    }

    div {
      display: flex;
      flex-direction: column !important;
      width: 100%;

      h1, h2, h3, h4 {
        text-align: center !important;
      }

      h1 {
        font-size: 3rem;
      }

      button {
        margin: 2rem auto !important;
        text-align: center !important;
        align-self: center !important;
        width: 100%;
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

    form {
      width: 70%;
      margin: auto;

      aside {
        display: flex;
        flex-direction: row !important;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin: 1rem 0;
      }

      img {
        max-width: 100%;
      }

      input, select {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 1rem;
        margin: .5rem 0;
        width: 100%;
      }

      button {
        margin: 2rem auto !important;
        text-align: center !important;
        align-self: center !important;
        width: 100%;
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

  hr {
    border: 0;
    height: 1px;
    background: #4c4738;
    margin: 10px 0 20px;
  }

  @media(max-width: 600px) {
    section {
      form {
        width: 100%;
      }
    }
  }
`;