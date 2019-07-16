fetch(chrome.extension.getURL('TestPage/test.html'))
    .then(response => response.text())
    .then(data => {
        let menu = document.createElement('div');
        menu.id = "klepto-box";
        menu.innerHTML = data;
        document.body.appendChild(menu);
    });

    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('TestPage/myscript.js');
    document.head.appendChild(s);