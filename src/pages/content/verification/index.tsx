import refreshOnUpdate from "virtual:reload-on-update-in-view";
import * as types from "@root/src/types/types";

refreshOnUpdate("pages/content");

const iFrame = document.createElement("iframe");
iFrame.src = chrome.runtime.getURL("verification.html");
iFrame.id = "uniweek-iframe";
iFrame.style.cssText = `
width: 291px;
height: 400px;
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
border-radius: 6px;
border: none;
`;

function renderIframe() {
  document.body.prepend(iFrame);
}

function closeIframe() {
  document.body.removeChild(iFrame);
}

chrome.runtime.onMessage.addListener(async (message: types.MessageObject) => {
  if (message.action !== "getWeekSchedule") {
    return;
  }

  renderIframe();
});

window.addEventListener("message", ({ data }: { data: types.MessageObject }) => {
  if (data.action !== "close") {
    return;
  }

  closeIframe();
});
