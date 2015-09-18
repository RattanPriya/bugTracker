// FORWARD BUTTON


function onClickForward() {
    console.log("forward")
    // if current point is not selected, select it
    console.log("current click IS selected");
    console.log(playback.currentClick);
    // minimize current point
    playback.currentClick.unSelected();
    // get Next point
    getNextClick().selected();

}

function getNextClick() {
    playback.counter +=1;
    playback.currentClick = playback.clicks[playback.counter];
    return playback.currentClick;
}


onClickForward();

/**
 * Created by stephanie.chou on 9/18/15.
 */
