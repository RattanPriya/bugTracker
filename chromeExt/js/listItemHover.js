/**
 * Created by stephanie.chou on 9/18/15.
 */


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "listItemClick"){
            onListItemHover();
        }

    });

function onListItemHover(){
    var click = playback.clicks[0];
    console.log(click)
    if (!click.isSelected){
        click.selected();
    } else {
        click.blink();
    }
}

