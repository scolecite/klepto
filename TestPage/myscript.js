let kleptoBox = document.getElementById("klepto-box");
let kleptoHeader = document.getElementById("klepto-header");
let isDown = false;
console.log('hello');

kleptoHeader.addEventListener('mousedown', function(e) {
    isDown = true;
    offset = [
        kleptoBox.offsetLeft - e.clientX,
        kleptoBox.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function() {
    isDown = false;
}, true);

document.addEventListener('mousemove', function(e) {
    if (isDown) {
        kleptoBox.style.left = (e.clientX + offset[0]) + 'px';
        kleptoBox.style.top  = (e.clientY + offset[1]) + 'px';
    }
}, true);