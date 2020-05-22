console.log('FIRE');
// Create all these variables.
var baseMenu, baseItem, siteName, menu, addItem, siteProps, copyProps, desiredProperties, totalItems;

if(typeof baseMenu === 'undefined') {
    totalItems = 0;
    if(window.location.href.startsWith('file')) {
      siteName = 'file';
    } else  {
      siteName = (new URL(window.location.href)).hostname.match(/[^.]+.[^.]+$/)[0];
    }
    addItem = function(props) {
        let item = baseItem.cloneNode(true);
        let itemVals = item.getElementsByClassName('klepto-prop-val');
        itemVals[0].innerHTML = props[0].match(/['"]*([^',"]+)/)[1];
        itemVals[0].style.fontFamily = props[0];
        itemVals[0].style.fontWeight = props[1];
        itemVals[0].style.fontSize = Math.min(20, parseInt(props[2])) + 'px';
        itemVals[0].style.color = props[4];
        itemVals[0].style.textDecoration = props[5];
        itemVals[0].style.fontStyle = props[6];
        itemVals[0].style.letterSpacing = props[7];
        itemVals[0].style.textTransform = props[8];
        itemVals[0].style.fontVariant = props[9];
        itemVals[0].style.textShadow = props[10];
        itemVals[1].innerHTML = parseInt(props[1]);
        itemVals[2].innerHTML = parseInt(props[2])+ 'px';
        let propString = getPropString(props);
        copyProps(propString);
        item.onclick = function() {
            navigator.clipboard.writeText(propString);
            // Rebuild the list of items, setting them all to the 'unselected' colors
            Array.from(document.getElementsByClassName("klepto-item")).forEach(
                (element, index, array) => {
                    console.log("index is " + index)
                    element.style.color = "#C8C8C8"; 
                    element.style.backgroundColor = "#1A1E33";  
                    kleptoCopy[index].style.fill = "#C8C8C8";
                    element.classList.remove("item-selected");
                }
            );
            // Add styles to selected element
            item.style.color = "#00FEB3";
            item.style.backgroundColor = "#282C41";
            item.classList.add("item-selected");
            // Set active icon color
            document.getElementsByClassName("item-selected")[0].children[3].children[0].style.fill = "00FEB3";
        }

        ++totalItems;
        return item;
    }


     getPropString = function(props)  {
        let propString = '';
        for(i = 0; i < desiredProperties.length; ++i)   {
            propString += desiredProperties[i] + ': ' + props[i] + '\n';
        }
        return propString;  
    }

    copyProps = function(propString)  {
        navigator.clipboard.writeText(propString);
    }
    desiredProperties = ['font-family', 'font-weight', 'font-size', 'line-height', 'color', 'text-decoration', 'font-style', 'letter-spacing', 'text-transform', 'font-variant', 'text-shadow'];
    fetch(chrome.extension.getURL('TestPage/test.html')) // Get the markup+styles of menu here.
    .then(response => response.text())
    .then(menuData => {
        baseMenu = document.createElement('div');
        baseMenu.id = "klepto-box";
        baseMenu.innerHTML = menuData;
        fetch(chrome.extension.getURL('TestPage/item.html'))
            .then(aresponse => aresponse.text())
            .then(itemData => {
                baseItem = document.createElement('div'); // Make a div
                baseItem.className = "klepto-item"; // Set its classname to klepto-item
                baseItem.innerHTML = itemData; // Load its contents with itemData
                baseItem.onclick = 
                menu = baseMenu.cloneNode(true);
                addMenu();
                document.body.appendChild(menu);
                let kleptoHeader = menu.getElementsByClassName("klepto-header")[0];

// Dragging it Around

                kleptoHeader.addEventListener('mousedown', function(e) {
                    offset = [
                        menu.offsetLeft - e.clientX,
                        menu.offsetTop - e.clientY
                    ];
                    document.addEventListener('mousemove', moveKleptoBox);
                });

                document.addEventListener('mouseup', function() {
                    document.removeEventListener('mousemove', moveKleptoBox);
                });

                function moveKleptoBox(e)    {
                    menu.style.left = (e.clientX + offset[0]) + 'px';
                    menu.style.top  = (e.clientY + offset[1]) + 'px';
                }
            });
    });
}   else    {
    addMenu();
}

function addMenu()  {
    let itemDiv = document.createElement('div');
    itemDiv.className = 'klepto-items';
    chrome.storage.sync.get(siteName, function(items)  {
        siteProps = items[siteName];
        if(siteProps.props.length !== totalItems)   {
            totalItems = 0;
            siteProps.props.forEach(props => {
                itemDiv.appendChild(addItem(props));
            })
        menu.lastChild.remove();
        menu.appendChild(itemDiv);
        }
    }); 
}
