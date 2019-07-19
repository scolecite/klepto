const disabledText = "Disabled. Click to enable.";
const enabledText = "Enabled. Click to disable.";
let toggleStatus;
let menu;
let siteDivs = {};

toggleUI(undefined, 'chrome://', false);

chrome.browserAction.onClicked.addListener(function(tab)  {
  console.log('clicked');
  updateStatus(tab.id, tab.url, true);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab)  {
  chrome.tabs.query(
    {currentWindow: true, active: true}, function(tabs) {
      if(tabs.length > 0 && tabs[0].id === tabId && changeInfo.status === 'complete')  {
        updateStatus(tabId, tabs[0].url, false);
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
    console.log(tabURL);
    let siteName;
    if(tabURL.startsWith('file')) {
      siteName = 'file';
    } else  {
      siteName = (new URL(tabURL)).hostname.match(/[^.]+.[^.]+$/)[0];
    }
    console.log(siteName);
    chrome.storage.sync.get(siteName, function(items)  {
      if(!items[siteName])  {
        items[siteName] = {};
        items[siteName].props = [];
      }
      if(toggle)  {
        items[siteName].status = !items[siteName].status;
      }
      if(toggle || !items[siteName]) {
        chrome.storage.sync.set({
          [siteName]: items[siteName]
        }, function() {
          console.log('toggling');
          toggleUI(curId, tabURL, items[siteName].status);
        });
      } else  {
        toggleUI(curId, tabURL, items[siteName].status);
      }
    });
  }
}

function toggleUI(curId, tabURL, state)  {
  if(!tabURL.startsWith('chrome://'))
  {
  toggleStatus = state;
  if(state) {
    chrome.browserAction.setTitle({title: enabledText, tabId: curId});
    chrome.browserAction.setIcon({
      path: {
        "16": "images/klepto_active_16.png",
        "32": "images/klepto_active_32.png",
        "48": "images/klepto_active_48.png",
        "128": "images/klepto_active_128.png"
      },
      tabId: curId
    });

    chrome.tabs.executeScript({file: 'addMenu.js'});
  } else  {
    chrome.browserAction.setTitle({title: disabledText, tabId: curId});
    chrome.browserAction.setIcon({
      path: {
        "16": "images/klepto_inactive_16.png",
        "32": "images/klepto_inactive_32.png",
        "48": "images/klepto_inactive_48.png",
        "128": "images/klepto_inactive_128.png"
      },
      tabId: curId
    });
    chrome.tabs.executeScript({file: 'killMenu.js'});
  }
}
}

chrome.commands.onCommand.addListener(function(command) {
  if(toggleStatus && command === "copy-styles")  {
    chrome.tabs.executeScript({file: 'csSketch.js'});
  }});

  chrome.windows.onFocusChanged.addListener(function(windowId)  {
    chrome.tabs.query(
      {currentWindow: true, active: true}, function(tabs) {
        if(tabs.length > 0) {
          updateStatus(tabs[0].id, tabs[0].url, false);
      }}
    );
  });

  chrome.runtime.onInstalled.addListener(function(details)  {
    chrome.storage.sync.clear();
  });