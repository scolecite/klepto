var desiredProperties = ['font-family', 'font-size', 'line-height', 'font-weight', 'color', 'text-decoration', 'font-style', 'letter-spacing', 'text-transform', 'font-variant', 'text-shadow'];
var properties = window.getComputedStyle(window.getSelection().anchorNode.parentNode);
var propString = desiredProperties.reduce((result, currentProp) =>
  result + currentProp + ': ' + properties.getPropertyValue(currentProp) + '\n', ""
  )
navigator.clipboard.writeText(propString);

var siteName = (new URL(window.location.href)).hostname.match(/[^.]+.[^.]+$/);

chrome.storage.sync.get('sites', function(items)  {
  console.log(items.sites);
  let siteName = (new URL(window.location.href)).hostname.match(/[^.]+.[^.]+$/);
    items.sites[siteName].props.push(propString);

    chrome.storage.sync.set({
      sites: items.sites
    });
});