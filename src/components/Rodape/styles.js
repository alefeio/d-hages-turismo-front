import styled from 'styled-components';

export const Rod = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #000;
  border-top: 1px solid #fff;
  text-align: center;

  ul {
    margin: auto;
  }

  ul li {
    display: flex;
    align-items: center;
  }

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
`;
