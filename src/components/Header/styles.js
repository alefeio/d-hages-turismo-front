import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

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
  z-index: 10;
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
    height: ${({ state, viewMenu }) => viewMenu === 'relative' ? `${state?.altura_menu*1.3}vh` : '40px'};
  }
`;

export const Nav = styled.nav`
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
    color: ${({ state }) => `#${state?.textbutton_color}`};
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
    background-color: ${({ state, bgMenu }) => state?.primary_color === 'transparent' && bgMenu === 'transparent' ? state?.primary_color : `#${state?.primary_color}`};
    display: ${(props) => (props.exibir ? 'flex' : 'none')};
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;

    ul {
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }

    ul li {
      width: 100%;
      padding: 0.5rem;
      color: ${({ state }) => `#${state?.textbutton_color}`};
      border-bottom: .5px solid ${({ state }) => state?.primary_color && darken(0.07, `#${state?.primary_color}`)};

      &:last-child {
        border-bottom: 0;
      }
    }

    ul li a {
      color: ${({ state }) => `#${state?.textbutton_color}`};
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
