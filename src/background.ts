interface TAB_STATS {
  [tabId: number]: [url: string, pWinId: number];
}

const CURRENT_TAB_DICT: TAB_STATS = {};

function open_panel_chat(tab) {
  console.log(tab.url, "클릭했음");
  const ignorePath = [
    "www.twitch.tv/settings",
    "www.twitch.tv/directory",
    "www.twitch.tv/subscriptions",
    "www.twitch.tv/wallet",
    "www.twitch.tv/drops",
    "www.twitch.tv/friends",
    "www.twitch.tv/p",
    "www.twitch.tv/jobs",
    "www.twitch.tv/turbo",
  ];
  if (
    !(
      (tab.url.startsWith("https://www.twitch.tv/") ||
        tab.url.startsWith("http://www.twitch.tv/")) &&
      ((): boolean => {
        for (const str of ignorePath) if (tab.url.includes(str)) return false;
        return true;
      })() &&
      "www.twitch.tv/" !== tab.url.substring(tab.url.indexOf("www."))
    )
  ) {
    console.log("not twitch");
    return;
  }
  const streamPath = tab.url.split("/")[3];
  // @ts-ignore
  chrome.windows.create(
    {
      url: "https://www.twitch.tv/" + streamPath + "/chat",
      type: "panel",
      focused: true,
      width: 500,
      height: 500,
    },
    function (window) {
      console.log("창생성완료");
      console.log(window, "생성된 창");
      CURRENT_TAB_DICT[tab.id] = [tab.url, window.id];
      console.log(CURRENT_TAB_DICT, "dict 생성됨");
    }
  );
}
//@ts-ignore
chrome.browserAction.onClicked.addListener(open_panel_chat);

//@ts-ignore
chrome.browserAction.onClicked.addListener(function (tab) {
  console.log(tab.id, "클릭시");
  console.log(tab.windowId, "클릭시");
});

//@ts-ignore
chrome.tabs.onCreated.addListener(function (tab) {
  console.log(tab.id, "탭 새로 생성");
  console.log(tab.windowId, "탭 새로 생성");
});

//@ts-ignore
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log(tab.url, "탭업데이트");
  console.log(tabId, "탭업데이트");
  console.log(tab.windowId, "탭업데이트");
});
