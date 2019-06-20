if (typeof copyCSS === 'undefined') {
  var desiredProperties = ['font-family', 'font-size', 'line-height', 'font-weight', 'color', 'text-decoration', 'font-style'];

  var copyCSS = function(e) {
    const properties = window.getComputedStyle(window.getSelection().anchorNode.parentNode);
    e.clipboardData.setData('text/plain', desiredProperties.reduce((result, currentProp) =>
      result + currentProp + ': ' + properties.getPropertyValue(currentProp) + '\n', ""
    ));
    e.preventDefault();
  };
}

if(toggleState)  {
  document.addEventListener('copy', copyCSS);
} else {
  document.removeEventListener('copy', copyCSS);
}
