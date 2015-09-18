/**
 * Created by stephanie.chou on 9/18/15.
 */


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.greeting == "listItemClick"){
            onListItemHover(request.id);
        }
    });

function onListItemHover(id){
    playback.currentClick.unSelected();
    var click = playback.clicks[id];
    if (!click.isSelected){
        click.selected();
    } else {
        click.blink();
    }
}

