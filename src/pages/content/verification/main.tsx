import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { createRoot } from "react-dom/client";
import * as types from "@src/types/types";
import GlobalStyle from "@pages/content/verification/GlobalStyle";
import App from "@pages/content/verification/App";
import Theme from "@root/src/pages/content/theme/Theme";

refreshOnUpdate("pages/content");

// A helper variable to trigger re-render
// on App omponent
// let trigger: boolean;

const reactRoot = createRoot(document.getElementById("root"));

window.addEventListener("message", ({ data }: { data: types.MessageObject }) => {
  reactRoot.render(
    <>
      <GlobalStyle />
      <Theme>
        <App />
      </Theme>
    </>,
  );
});
