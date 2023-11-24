import styled from 'styled-components';

export const Rod = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #fff;
  background: #000;
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
