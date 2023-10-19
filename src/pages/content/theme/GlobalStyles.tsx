import { createGlobalStyle } from "styled-components";
import { themeColor } from "./Theme";

const GlobalStyles = createGlobalStyle`
*,
*:before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  user-select: none;
}

body {
  font-family: Vazir, sans-serif;
  color: ${themeColor("gray")};
}

button {
  border: none;
  outline: none;
  font: inherit;
}

`;

export default GlobalStyles;
