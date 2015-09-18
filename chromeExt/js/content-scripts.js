trigger_key = 90; //Z
contentScriptMessage = "Skinner Said the teachers will crack any minute";

if (window == top) {
  window.addEventListener('keyup', doKeyPress, false); 
}

function doKeyPress(e){
  if (e.shiftKey && e.ctrlKey && e.keyCode == trigger_key){ 
    alert("Contentscript is sending a message to background script: '" + contentScriptMessage  + "'");
    chrome.extension.sendRequest({message: contentScriptMessage});
  }
}

chrome.runtime.onMessage.addListener(
  function(request, sender) {
    alert("Contentscript has received a message from from background script: '" + request.message + "'");
  });
