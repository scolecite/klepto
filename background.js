const disabledText = "Disabled. Click to enable.";
const enabledText = "Enabled. Copy text like normal to copy css styles instead. Click to disable."

let toggleState = false;

chrome.browserAction.onClicked.addListener(function(tab)  {
  if(toggleState)  {
    chrome.browserAction.setTitle({title: disabledText});
    chrome.browserAction.setIcon({
      path: "/images/disabled.png"
    })
  } else {
    chrome.browserAction.setTitle({title: enabledText});
    chrome.browserAction.setIcon({
      path: "/images/enabled.png"
    })
  }
  toggleState = !toggleState;
  chrome.tabs.executeScript(tab.id, {
    code: 'var toggleState = ' + toggleState + ';'
  }, function() {
      chrome.tabs.executeScript(tab.id, {file: 'csSketch.js'});
  });
});
