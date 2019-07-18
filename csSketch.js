var desiredProperties = ['font-family', 'font-weight', 'font-size', 'line-height', 'color', 'text-decoration', 'font-style', 'letter-spacing', 'text-transform', 'font-variant', 'text-shadow'];
var rawProperties = window.getComputedStyle(window.getSelection().anchorNode.parentNode);
var properties = desiredProperties.map(prop => rawProperties.getPropertyValue(prop));
// var propString = desiredProperties.reduce((result, currentProp) =>
//   result + currentProp + ': ' + properties.getPropertyValue(currentProp) + '\n', ""
//   )
// navigator.clipboard.writeText(propString);

var siteName = (new URL(window.location.href)).hostname.match(/[^.]+.[^.]+$/);

chrome.storage.sync.get('sites', function(items)  {
  var siteName = (new URL(window.location.href)).hostname.match(/[^.]+.[^.]+$/);
    items.sites[siteName].props.push(properties);
    console.log(items.sites);
    chrome.storage.sync.set({
      sites: items.sites
    });
    chrome.storage.sync.getBytesInUse(null, function(bytesInUse)  {
      console.log(bytesInUse);
    })
});