{
  var rawProperties = window.getComputedStyle(window.getSelection().anchorNode.parentNode);
var properties = desiredProperties.map(prop => rawProperties.getPropertyValue(prop));

siteProps.props.unshift(properties);
chrome.storage.sync.set({
  [siteName]: siteProps
});
let itemDiv = menu.getElementsByClassName('klepto-items')[0];
let item = addItem(properties);
if(itemDiv.children.length) item.style.height = '0px';
itemDiv.insertBefore(item, itemDiv.firstChild);
item.offsetHeight; // Force the browser to compute the height before we change it
item.style.height = '51px';
}