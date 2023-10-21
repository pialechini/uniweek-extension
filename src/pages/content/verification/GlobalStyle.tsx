import { createGlobalStyle } from "styled-components";

import Vazir from "@assets/Vazir.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Vazir;
    src: url(${Vazir});
    font-weight: 700;
    font-style: normal;
  }

  body {
    font-family: Vazir;
    color: #8EA2A1;
  }

  * {
    box-sizing: border-box;
    user-select: none;
    padding: 0;
    margin: 0;
  }

  button {
    outline: none;
    border: none;
    font: inherit;
    cursor: pointer;
  }
`;

export default GlobalStyle;
