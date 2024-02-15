import styled from 'styled-components';
import { darken } from 'polished';

export const Rod = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #fff;
  background: ${({ primary_color }) => primary_color && darken(0.3, `#${primary_color}`)};
  border-top: 1px solid #fff;
  text-align: center;
  padding: 1rem 2rem;

  ul li a {
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
    padding: 5px;
  }

  ul li img {
    margin: 4px 8px 0 0;
    width: 25px;
    height: 25px;
  }

  ul li h2 {
    font-size: 22px;
    text-transform: uppercase;
  }

  @media(max-width: 600px) {
    text-align: left;
  }
`;

export const Trabalhe = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  background: ${({ primary_color }) => primary_color && darken(0.3, `#${primary_color}`)};
  padding: 10rem;

  h2, p {
    color: ${({ second_color }) => `#${second_color}`};
  }

  section {
    img {
      margin: 1rem 1rem 0 0;
    }
  }

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
      margin: 0 0 1rem;

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
      background: ${({ primary_color }) => primary_color && darken(0.4, `#${primary_color}`)};
      font-weight: bold;
      color: #fff;
      border: 0;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${({ primary_color }) => primary_color && darken(0.5, `#${primary_color}`)};
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
    padding: 10rem 5rem;

    form {
      width: 100%;
    }

    img {
      max-width: 60%;
      margin: 5rem;
    }
  }
`;


export const Container = styled.div`
  background: #fff;
`;
