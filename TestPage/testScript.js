// copy: function(str, mimeType) {
//   document.oncopy = function(event) {
//     event.clipboardData.setData(mimeType, str);
//     event.preventDefault();
//   };
//   document.execCommand("copy", false, null);
// }

// document.addEventListener('copy', function(e){
  //console.log(e.clipboardData.items);
  //e.clipBoardData.setData('text/plain', 'okay');
  //console.log(e.clipBoardData.types);
//   e.clipboardData.setData('application/json', 'foo');
//   e.preventDefault(); // default behaviour is to copy any selected text
// });
//
// document.getElementById("copyBtn").onclick = function() {
//   console.log("pressed");
// }

// let data = new DataTransfer();
//
//   data.items.add("text/plain", "howdy planet");
//   navigator.clipboard.write(data).then(function() {
//     console.log("yee");
//   }, function() {
//     console.log("rip");
//   });

  // var data = new DataTransfer();
  // data.items.add("rawr", "text/plain");
  // navigator.clipboard.write(data).then(function() {
  // console.log("Copied to clipboard successfully");
  // }, function() {
  // console.log("Copied to clipboard failed");
  // });

  function convertDecoration(dec) {
    console.log(dec);
    let split = dec.split();
    let decorations = [];
    for(let i = 0; i < split.length - 2; ++i) {
      switch(split[i])  {
        case 'underline':
          decorations[0] = 'single';
          break;
        case 'line-through':
          decorations[1] = 'single';
          break;
        default:
          alertM('Unknown text-decoration: ' + split[i]);
      }
    }

    if(decorations.length) {
      switch(split[split.length - 2]) {
        case 'double':
          decorations[0] = 'double';
          decorations[1] = 'double';
          break;
        case 'dotted':
          decorations[0] += ' dot';
          decorations[1] += ' dot';
          break;
        case 'dashed':
          decorations[0] += ' dash';
          decorations[1] += ' dash';
          break;
        default:
          alertM('Unknown text-decoration-style: ' + split[split.length - 2]);
      }
    }

    return decorations;
  }

  convertDecoration('underline solid rgb(0, 0, 0)');
