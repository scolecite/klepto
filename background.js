const disabledText = "Disabled. Click to enable.";
const enabledText = "Enabled. Click to disable.";
let toggleStatus;

toggleUI(undefined, false);

chrome.browserAction.onClicked.addListener(function(tab)  {
  updateStatus(tab.id, tab.url, true);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)  {
  chrome.tabs.query(
    {currentWindow: true, active: true}, function(tabs) {
      if(tabs.length > 0 && tabs[0].id === tabId)  {
        updateStatus(tabId, changeInfo.url, false);
      }
    });
});

chrome.tabs.onActivated.addListener(function(activeInfo)  {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    updateStatus(tab.id, tab.url, false);
  })
})

function updateStatus(curId, tabURL, toggle) {
  if(tabURL !== undefined)  {
    chrome.storage.sync.get('sites', function(items)  {
      console.log(items.sites);
      let siteName = (new URL(tabURL)).hostname.match(/[^.]+.[^.]+$/);
      if(toggle)  {
        items.sites[siteName] = !items.sites[siteName];
        chrome.storage.sync.set({
          sites: items.sites
        });
      }
      toggleUI(curId, items.sites[siteName]);
    });
  }
}

function toggleUI(curId, state)  {
  toggleStatus = state;
  if(state) {
    chrome.browserAction.setTitle({title: enabledText, tabId: curId});
    chrome.browserAction.setIcon({
      path: "/images/enabled.png",
      tabId: curId
    });
  } else  {
    chrome.browserAction.setTitle({title: disabledText, tabId: curId});
    chrome.browserAction.setIcon({
      path: "/images/disabled.png",
      tabId: curId
    });
  }
}

chrome.commands.onCommand.addListener(function(command) {
  if(toggleStatus && command === "copy-styles")  {
    chrome.tabs.query(
      {currentWindow: true, active: true}, function(tabs) {
        if(tabs.length > 0) {
          chrome.tabs.executeScript(tabs[0].id, {file: 'csSketch.js'});
        }
      }
    );
  }});

  chrome.runtime.onInstalled.addListener(function(details)  {
    chrome.storage.sync.set({
      sites: {}
    });
  });

  chrome.windows.onFocusChanged.addListener(function(windowId)  {
    chrome.tabs.query(
      {currentWindow: true, active: true}, function(tabs) {
        if(tabs.length > 0) {
          updateStatus(tabs[0].id, tabs[0].url, false);
      }}
    );
  });