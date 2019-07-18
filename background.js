const disabledText = "Disabled. Click to enable.";
const enabledText = "Enabled. Click to disable.";
let toggleStatus;
let menu;
let siteDivs = {};

// fetch(chrome.extension.getURL('TestPage/test.html'))
//     .then(response => response.text())
//     .then(menuData => {
//       menu = menuData;
//     });
// console.time('hello');
// fetch(chrome.extension.getURL('TestPage/test.html'))
//     .then(response => response.text())
//     .then(menuData => {
//         fetch(chrome.extension.getURL('TestPagef/item.html'))
//             .then(aresponse => aresponse.text())
//             .then(itemData => {
//                 menu = document.createElement('div');
//                 menu.id = "klepto-box";
//                 menu.innerHTML = menuData;
                

//                 let itemList = document.createElement('div');
//                 itemList.className = "klepto-item";
//                 itemList.innerHTML = itemData;
//                 let itemVals = itemList.getElementsByClassName('klepto-prop-val');
//                 itemVals[0].innerHTML = "FontFam";
//                 itemVals[1].innerHTML = "100";
//                 itemVals[2].innerHTML = "2px";

//                 let itemDiv = menu.getElementsByClassName('klepto-items');
//                 itemDiv[0].appendChild(itemList);
//             });
//     });
//     console.timeEnd('hello');

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
      if(!items.sites[siteName])  {
        items.sites[siteName] = {};
        items.sites[siteName].props = [];
      }
      if(!siteDivs[siteName])  {
        siteDivs[siteName] = menu;
      }
      if(toggle)  {
        items.sites[siteName].status = !items.sites[siteName].status;
        chrome.storage.sync.set({
          sites: items.sites
        });
      }
      toggleUI(curId, items.sites[siteName].status);
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
    // let itemVals = menu.getElementsByClassName('klepto-prop-val');
    // itemVals[1].innerHTML = 1 + parseInt(itemVals[1].innerHTML);
    // console.log(1);

    chrome.tabs.executeScript({file: 'addMenu.js'});

    chrome.tabs.insertCSS({file: 'TestPage/test.css'});
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
    chrome.tabs.executeScript({file: 'csSketch.js'});
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