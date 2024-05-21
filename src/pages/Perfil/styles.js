import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  div.Toastify__toast {
    z-index: 1000000000000000000000000000000000000000000000000000000000000 !important;
  }

  section {
    padding: 5rem;

    h2 {
      margin-bottom: 2rem;
    }

    h3 {
      text-align: center;
    }

    form {
      width: 70%;
      margin: auto;

      div {
        display: flex;
        align-items: flex-start;

        img {
          margin: 0 0 0 1rem;
          width: 30px;
          height: 30px;

        }
      }

      img {
        max-width: 100%;
      }

      input {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 1rem;
        margin: .5rem 0 2rem;
        width: 100%;
      }

      button {
        margin: 1rem 0;
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

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;
    }

    span {
      color: red;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: #4c4738;
      margin: 10px 0 20px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #4c4738;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
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

  @media(max-width: 600px) {
    section {
      form {
        width: 100%;
      }
    }
  }
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

export const Img = styled.img`
  width: 70px;
  height: 70px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: .5rem;

&:hover {
  background: #efefef;
}

  &:active {
    background: #ddd;
  }
`;