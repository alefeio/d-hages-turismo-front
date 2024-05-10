import styled, { keyframes } from 'styled-components';

import icosearch from '~/assets/ico-search.jpg';

export const Img = styled.img`
  width: 40px;
  height: 40px;
  display: none;

  @media (max-width: 1025px) {
    display: block;
    z-index: 100;
  }
`;

export const Container = styled.div`
  padding: 1rem;
  position: ${({ viewMenu }) => viewMenu};
  width: 100%;
  margin: auto !important;
  z-index: 10000000000000000000000000000000000000000000000000000000000000;
  background-color: ${({ state, bgMenu }) => state?.primary_color === 'transparent' && bgMenu === 'transparent' ? state?.primary_color : `#${state?.primary_color}`};

  h1, h2, h3, h4, h5, h6, p, li, strong, a, input, button, span, textarea {
    font-family: ${({ state }) => state?.font_serifa ? "'Source Serif 4', serif" : "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif"} !important;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1300px;
  margin: auto;
  height: ${({ state, viewMenu }) => viewMenu === 'relative' ? `${state?.altura_menu}vh` : '40px'};
  a {
    height: 100%;
    display: flex;
    align-items: center;
    color: ${({ state }) => `#${state?.textbutton_color}`};

    img {
      height: 100%;
    }
  }

  @media(max-width: 600px) {
    padding: 1rem;
    height: ${({ state, viewMenu }) => viewMenu === 'relative' ? `${state?.altura_menu*1.3}vh` : '40px'};
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex: 1;

  ul {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    list-style: none;
    flex-wrap: wrap;
  }

  ul li a {
    font-size: 16px;
    font-weight: bold;
    color: ${({ state }) => `#${state?.textbutton_color}`};
    margin: 1rem;
    padding: 1rem;
    transition: 0.2s;

    &:hover {
      border-bottom: 2px solid #ffb156;
    }

    &:active {
      border-bottom: 2px solid #ffb156;
    }
  }

  ul li input {
    width: 150px;
    background: transparent;
    border: 1px solid #c2a549;
    height: 34px;
    padding: 0 30px 0 12px;
    border-radius: 16px;
    font-size: 12px;
    background: url(${icosearch}) no-repeat 120px center;
    background-size: 10%;

    &::placeholder {
      color: #222;
    }
  }

  @media (max-width: 1025px) {
    display: ${(props) => (props.exibir ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.9);

    ul {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    ul li {
      margin: 5px;
      padding: 0.5rem;
    }

    ul li a {
      font-size: 2.4rem;
      color: #fff;

      &:hover {
        color: #c2a549;
      }
    }
  }
`;

export const Profile = styled.div`
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #00170e;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #00170e;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #00170e;
    }
  }

  img {
    width: 32px !important;
    height: 32px !important;
    border-radius: 50%;
  }
`;
