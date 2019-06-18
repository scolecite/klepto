const disabledText = "Disabled. Click to enable.";
const enabledText = "Enabled. Copy text like normal to copy css styles instead. Click to disable."

let status = false;

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log("The color is green.");
    });
    // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    //   chrome.declarativeContent.onPageChanged.addRules([{
    //     conditions: [new chrome.declarativeContent.PageStateMatcher({
    //       pageUrl: {hostEquals: 'developer.chrome.com'},
    //     })
    //     ],
    //         actions: [new chrome.declarativeContent.ShowPageAction()]
    //   }]);
    // });
  });

chrome.browserAction.onClicked.addListener(function(tab)  {
  console.log('testing');
  if(status)  {
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
  chrome.tabs.executeScript(tab.id, {file: 'csSketch.js'});

  // chrome.tabs.onActivated.addListener(function(tab) {
  //
  // })
  status = !status;
  // chrome.browserAction.getTitle({}, function(title) {
  //   if(title === disabledText)  {
  //     chrome.browserAction.setTitle({title: enabledText});
  //     // chrome.browserAction.setIcon({
  //     //   path: "/images/enabled.png"
  //     // });
  //     document.addEventListener('copy', copyCSS);
  //   } else {
  //     chrome.browserAction.setTitle({title: disabledText});
  //   //   chrome.browserAction.setIcon({
  //   //     path: "/images/disabled.png"
  //   // })
    // document.removeEventListener('copy', copyCSS);
    // chrome.tabs.executeScript(null, {file: "csSketch.js"});




});
