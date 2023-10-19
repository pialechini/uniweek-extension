import * as types from "@src/types/types";
import { defaultTheme } from "./defaultTheme";
import { ThemeProvider } from "styled-components";
import { PropsWithChildren } from "react";

export const themeColor = (color: types.ThemeColor) => props => props.theme.colors[color];

function Theme({ children }: PropsWithChildren) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}

export default Theme;
