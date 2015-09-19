// Here You can type your custom JavaScript...
//debugger;

function Queue(){
    this.queue = [];
}

var queue = new Queue();

if (window == top) {
  window.addEventListener('click', doSendQueueDataToExtension, false); 
}

function doSendQueueDataToExtension(){
  if (queue.queue.length > 0){
    JSON.stringify(queue.queue);
    chrome.extension.sendRequest({queue: queue.queue});
  }
}

chrome.runtime.onMessage.addListener(
    function(request, sender) {
        JSON.stringify(queue);
    });

var QUEUE_SIZE = 30;

var dataDump = document.createElement("div");
dataDump.setAttribute("id", "data_dump");
dataDump.setAttribute("style", "visibility: hidden");
 document.getElementsByTagName("body")[0].appendChild(dataDump)

document.onclick = function(e) {

  var value = '';
  var text = '';
  var id = '';
  if(getCookie() == undefined){
    setCookie("cname",1)
  } else{
    var value = getCookie("cname").split('&')[0];
    var dateString = getCookie("cname").split('&')[1];
    var date = new Date(dateString);
    var currentDate = new Date();
    if(currentDate > date){
      setCookie("cname",parseInt(value) + 1);
    }
  }
    if(text == '' && ($(e.target).closest("a").context != undefined)
        && ($(e.target).closest("a").context.outerText != undefined)) {
        text = $(e.target).closest("a").context.outerText.substring(0,20);
    }
    if(text.trim() == '' && ($(e.target).closest("a").context != undefined)
        && ($(e.target).closest("a").context.innerText != undefined)) {
        text = $(e.target).closest("a").context.innerText.substring(0,20);
    }
    if(text.trim() == '' && ($(e.target).closest("a").context != undefined)
        && ($(e.target).closest("a").context.placeholder != undefined)) {
        text = $(e.target).closest("a").context.placeholder.substring(0,20);
    }

    var click = {
        X: e.pageX,
        Y: e.pageY,
        time: e.timeStamp,
        error: false,
        classname: e.target.className,
        id: e.target.id,
        uri: e.currentTarget.baseURI,
        closesttext: text,
        sessionid: value
    }
    
    if (id!=='none') {
          click.id = id;
    }
    
    console.log(click);
    
    if (queue.queue.length < QUEUE_SIZE) {
        queue.queue.push(click);
        var node = document.createElement("div");                 // Create a <li> node
        var textnode = document.createTextNode(JSON.stringify(click));         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("data_dump").appendChild(node)

    } else {
        queue.queue.shift(1);
        queue.queue.push(click);
    }

}

function getCookie(cname) {
    var name = cname + "=";
    var cookiearray = document.cookie.split(';');
    for(var i=0; i<cookiearray.length; i++){
        var key = cookiearray[i].split('=')[0];
        var value = cookiearray[i].split('=')[1];
        if (key.trim() == "cname"){
        return value;
        }
    }
}

function setCookie(cname, cvalue) {
    var d1 = new Date ();
    d2 = new Date ( d1 );
    d2.setMinutes ( d1.getMinutes() + 5 );
    document.cookie = cname + "=" + cvalue + "&" + d2;
}
