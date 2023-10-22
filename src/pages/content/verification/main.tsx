import App from "@pages/content/verification/App";
import GlobalStyle from "@pages/content/verification/GlobalStyle";
import Theme from "@root/src/pages/content/theme/Theme";
import * as types from "@src/types/types";
import { createRoot } from "react-dom/client";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
refreshOnUpdate("pages/content");

window.parent.postMessage({ action: "extractWeekSchedules" }, "*");

window.addEventListener("message", ({ data }: { data: types.MessageObject }) => {
  if (data.action !== "weekSchedules") {
    return;
  }

  createRoot(document.getElementById("root")).render(
    <>
      <GlobalStyle />
      <Theme>
        <App
          weekSchedules={data.payload.weekSchedules}
          studentIdentity={data.payload.studentIdentity}
        />
      </Theme>
    </>,
  );
});
