import * as types from "@src/types/types";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./defaultTheme";

export const themeColor = (color: types.ThemeColor) => (props) => props.theme.colors[color];

function Theme({ children }: PropsWithChildren) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}

export default Theme;
