const desiredProperties = ['font-family', 'font-size', 'line-height', 'font-weight', 'color', 'text-decoration', 'font-style'];

//CAN I MAKE ARROW
const copyCSS = function(e) {
  const properties = window.getComputedStyle(window.getSelection().anchorNode.parentNode);
  e.clipboardData.setData('text/plain', desiredProperties.reduce((result, currentProp) =>
    result + currentProp + ': ' + properties.getPropertyValue(currentProp) + '\n', ""
  ));
  e.preventDefault();
}

if(status)  {
  document.removeEventListener('copy', copyCSS);
} else {
  document.addEventListener('copy', copyCSS);
}


console.log(status);
