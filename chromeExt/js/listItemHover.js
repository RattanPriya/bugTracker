/**
 * Created by stephanie.chou on 9/18/15.
 */


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        onListItemHover();
        if (request.greeting == "hello")
            sendResponse({farewell: "goodbye"});
    });

function onListItemHover(){
    debugger;
}

