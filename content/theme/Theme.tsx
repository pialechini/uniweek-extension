import * as types from "../../../types/types";
import { defaultTheme } from "./defaultTheme";
import { ExecutionContext } from "styled-components";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";

export const themeColor =
  (color: types.ThemeColor) => (props: ExecutionContext) =>
    props.theme.colors[color];

function Theme({ children }: PropsWithChildren) {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>;
}

export default Theme;
