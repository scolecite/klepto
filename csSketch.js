var desiredProperties = ['font-family', 'font-size', 'line-height', 'font-weight', 'color', 'text-decoration', 'font-style', 'letter-spacing', 'text-transform', 'font-variant', 'text-shadow'];
var properties = window.getComputedStyle(window.getSelection().anchorNode.parentNode);
navigator.clipboard.writeText(desiredProperties.reduce((result, currentProp) =>
  result + currentProp + ': ' + properties.getPropertyValue(currentProp) + '\n', ""
));