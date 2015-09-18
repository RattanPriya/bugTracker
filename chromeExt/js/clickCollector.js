// Here You can type your custom JavaScript...
//debugger;
var queue = [];
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
        sessionid: value
    }
    
    if (id!=='none') {
          click.id = id;
    }
    
    console.log(click);
    
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
