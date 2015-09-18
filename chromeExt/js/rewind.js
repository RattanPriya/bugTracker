// REWIND BUTTON



function onClickRewind() {
    // if current point is not selected, select it
        console.log("current click IS selected")
        console.log(playback.currentClick)
        // minimize current point
        playback.currentClick.unSelected();
        // get prev point
        getPrevClick().selected();

}

function getPrevClick() {
    playback.counter -=1;
    playback.currentClick = playback.clicks[playback.counter];
    return playback.currentClick;
}


onClickRewind();

