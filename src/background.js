chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.windows.create({
    url: chrome.runtime.getURL("popup.html"),
    type: "popup",
    width: 300,
    height: 900,
    left: screen.width,
  });
});
