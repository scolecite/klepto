var baseMenu, baseItem, siteName, menu, addItem, siteProps, copyProps, desiredProperties;

if(typeof baseMenu === 'undefined') {
    siteName = (new URL(window.location.href)).hostname.match(/[^.]+.[^.]+$/);
    addItem = function(props) {
        let item = baseItem.cloneNode(true);
        let itemVals = item.getElementsByClassName('klepto-prop-val');
        itemVals[0].innerHTML = props[0].match(/['"]*([^',"]+)/)[1];
        itemVals[0].style.fontFamily = props[0];
        itemVals[0].style.fontWeight = props[1];
        itemVals[0].style.fontSize = Math.min(30, parseInt(props[2])) + 'px';
        itemVals[0].style.color = props[4];
        itemVals[0].style.textDecoration = props[5];
        itemVals[0].style.fontStyle = props[6];
        itemVals[0].style.letterSpacing = props[7];
        itemVals[0].style.textTransform = props[8];
        itemVals[0].style.fontVariant = props[9];
        itemVals[0].style.textShadow = props[10];
        itemVals[1].innerHTML = props[1];
        itemVals[2].innerHTML = props[2];
        return item;
    }
    // copyProps = function()  {
    //     let propString = '';
    //     for(i = 0; i < desiredProperties.length; ++i)   {
    //         propString += desiredProperties[i] + ': ' + siteProps[]
    //     }
    //     var propString = desiredProperties.reduce((result, currentProp) =>
    //         result + currentProp + ': ' + properties.getPropertyValue(currentProp) + '\n', ""
    //         )
    //         navigator.clipboard.writeText(propString);
    // }
    desiredProperties = ['font-family', 'font-weight', 'font-size', 'line-height', 'color', 'text-decoration', 'font-style', 'letter-spacing', 'text-transform', 'font-variant', 'text-shadow'];
    fetch(chrome.extension.getURL('TestPage/test.html'))
    .then(response => response.text())
    .then(menuData => {
        baseMenu = document.createElement('div');
        baseMenu.id = "klepto-box";
        baseMenu.innerHTML = menuData;
        fetch(chrome.extension.getURL('TestPage/item.html'))
            .then(aresponse => aresponse.text())
            .then(itemData => {
                baseItem = document.createElement('div');
                baseItem.className = "klepto-item";
                baseItem.innerHTML = itemData;
                baseItem.onclick = 
                console.log(baseItem);
                addMenu();
            });
    });
}   else    {
    menu.remove();
    addMenu();
}

function addMenu()  {
    menu = baseMenu.cloneNode(true);
    let itemDiv = menu.getElementsByClassName('klepto-items')[0];

    chrome.storage.sync.get('sites', function(items)  {
        siteProps = items.sites[siteName].props;
        siteProps.forEach(props => {
            itemDiv.appendChild(addItem(props));
        })
    });
    document.body.appendChild(menu);
}