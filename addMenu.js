console.log('wut');
fetch(chrome.extension.getURL('TestPage/test.html'))
    .then(response => response.text())
    .then(menuData => {
        fetch(chrome.extension.getURL('TestPage/item.html'))
            .then(aresponse => aresponse.text())
            .then(itemData => {
                let menu = document.createElement('div');
                menu.id = "klepto-box";
                menu.innerHTML = menuData;

                var siteName = (new URL(window.location.href)).hostname.match(/[^.]+.[^.]+$/);
                let itemDiv = menu.getElementsByClassName('klepto-items');
                chrome.storage.sync.get('sites', function(items)  {
                    items.sites[siteName].props.forEach(item => {
                        let itemList = document.createElement('div');
                        itemList.className = "klepto-item";
                        itemList.innerHTML = itemData;
                        let itemVals = itemList.getElementsByClassName('klepto-prop-val');
                        console.log(item[0]);
                        itemVals[0].innerHTML = item[0].match(/^['"]*(.+?)['",]*$/)[1];
                        itemVals[1].innerHTML = item[1];
                        itemVals[2].innerHTML = item[2];
                        itemDiv[0].appendChild(itemList);
                    })
                });
                document.body.appendChild(menu);
            });
    });

//     // var s = document.createElement('script');
//     // s.src = chrome.runtime.getURL('TestPage/myscript.js');
//     // document.head.appendChild(s);

// if(typeof test === 'undefined') {
//     var test = document.createElement('div');
//     test.id = "klepto-box";
//     document.body.appendChild(test);
// }
// console.log(config);
// test.innerHTML = config;

// let test = 'hi';
// console.log('wut');