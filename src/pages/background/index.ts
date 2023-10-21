import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

reloadOnUpdate("pages/background");

async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.commands.onCommand.addListener(async command => {
  if (command !== "getWeekSchedule") {
    return;
  }

  const tab = await getCurrentTab();
  chrome.tabs.sendMessage(tab.id, {
    action: "getWeekSchedule",
  });
});
