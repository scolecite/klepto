const disabledText = "Disabled. Click to enable.";
const enabledText = "Enabled. Click to disable.";
let toggleStatus;
let menu;
let siteDivs = {};

// console.log('LEGIT');
// let siteName = (new URL(`https://www.w3schools.com/jsref/met_win_settimeout.asp`)).hostname.match(/[^.]+.[^.]+$/)[1];
// console.log(siteName);
// let maybe = 'isfat';
// chrome.storage.sync.set({
//   [siteName]: maybe
// });
// chrome.storage.sync.get(siteName, function(items)  {
//   console.log(items);
// })
// console.log('ENDLEGIT');

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
  console.log('WUT');
  chrome.storage.sync.get(null, function(items)  {
    console.log('HERE');
    console.log(items);
  })
  if(tabURL !== undefined)  {
    let siteName = (new URL(tabURL)).hostname.match(/[^.]+.[^.]+$/)[0];
    chrome.storage.sync.get(siteName, function(items)  {
      console.log(items[siteName]);
      if(!items[siteName])  {
        console.log('initializing!');
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
          toggleUI(curId, items[siteName].status);
        });
      } else  {
        toggleUI(curId, items[siteName].status);
      }
    });
  }
}

function toggleUI(curId, state)  {
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
    console.log('trying!');
    // let itemVals = menu.getElementsByClassName('klepto-prop-val');
    // itemVals[1].innerHTML = 1 + parseInt(itemVals[1].innerHTML);
    // console.log(1);

    chrome.tabs.executeScript({file: 'addMenu.js'});

    chrome.tabs.insertCSS({file: 'TestPage/test.css'});
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