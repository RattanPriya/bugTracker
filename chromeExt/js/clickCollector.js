// Here You can type your custom JavaScript...


var queue = [];
var QUEUE_SIZE = 30;

var dataDump = document.createElement("div");
dataDump.setAttribute("id", "data_dump");
dataDump.setAttribute("style", "visibility: hidden");
 document.getElementsByTagName("body")[0].appendChild(dataDump)

document.onclick = function(e) {
    var text = '';
    var id = '';

    if($(e.target).is('a')){
       text = $(e.target).html();
    } else if(text == '') {
       text = $(e.target).closest("div").siblings("span").text();
    }

    if($(e.target).parent().closest('div[id]') != '' &&
    $(e.target).parent().closest('div[id]') != 'undefined'){
      id = $(e.target).parent().closest('div[id]')[0]? $(e.target).parent().closest('div[id]')[0].id : 'none';
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
      

    }
    if (id!=='none') {
          click.id = id;
    }
    if (queue.length < QUEUE_SIZE) {
        queue.push(click);
        var node = document.createElement("div");                 // Create a <li> node
        var textnode = document.createTextNode(JSON.stringify(click));         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        document.getElementById("data_dump").appendChild(node)

    } else {
        queue.shift(1);
        queue.push(click);
    }

}
