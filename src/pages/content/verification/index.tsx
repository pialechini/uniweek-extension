import {
  constructWeekSchedule,
  extractGeneralWeekSchedule,
  extractIdentity,
} from "@root/src/shared/golestan/payload-78";
import * as types from "@root/src/types/types";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/content");

function getWeekSchedulesFromThePage() {
  try {
    const generalWeekSchedule = extractGeneralWeekSchedule();
    const evenWeekSchedule = constructWeekSchedule(
      generalWeekSchedule,
      "even",
    ) as types.WeekSchedule;
    const oddWeekSchedule = constructWeekSchedule(generalWeekSchedule, "odd") as types.WeekSchedule;

    return {
      evenWeekSchedule,
      oddWeekSchedule,
    } as types.WeekSchedules;
  } catch (error) {
    return undefined;
  }
}

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
z-index: 100;
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
  if (data.action !== "extractWeekSchedules") {
    return;
  }

  iFrame.contentWindow.postMessage(
    {
      action: "weekSchedules",
      payload: {
        studentIdentity: extractIdentity(),
        weekSchedules: getWeekSchedulesFromThePage(),
      },
    },
    "*",
  );
});

window.addEventListener("message", ({ data }: { data: types.MessageObject }) => {
  if (data.action !== "close") {
    return;
  }

  closeIframe();
});
