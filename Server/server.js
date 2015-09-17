var express      = require('express'),
	app	           = express(),
	bodyParser 		 = require('body-parser'),
  cookieParser   = require('cookie-parser'),
  session        = require('express-session'),
  morgan         = require('morgan');

var url = 'mongodb://localhost:27017/test';
var db = require('mongoskin').db(url);
var http = require('http').Server(app);

var testdb = db.collection("test");


//app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret : 'keyboard cat'}));


//
app.use('/js', express.static(__dirname+'/client/js'));
app.use('/bower_components', express.static(__dirname+'/bower_components'));
app.use('/css', express.static(__dirname+'/client/views/css'));
app.use('/views', express.static(__dirname+'/client/views'));
app.use('/images', express.static(__dirname+'/client/views/images'));
app.use('/', express.static(__dirname+'/client/views'));

//Home Page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/views/home.html');
});

//access with
//http://localhost:3000/api/test?name=matin&birth=yes&death=no
app.get('/api/test', function(req, res){
  testdb.insert(req.query, function(err, result) {
    if (err) {
      res.json(err);
      throw err;
    }
    if (result) {
      console.log('Added!');
      res.json(result);
    } else {
      res.json({});
    }
  });
});

//access with
//$.ajax({type:"POST",url:"http://localhost:3000/api/testPost", data:{hello: "goodbye"}, success:null, dataType:"json"});
//$.post("http://localhost:3000/api/testPost",{test:"test"}, function(data){console.log(data);}, "json");
app.post('/api/testPost', function(req, res){
  testdb.insert(req.body, function(err, result) {
    if (err) {
      res.json(err);
      throw err;
    }
    if (result){
      console.log('Added!');
      res.json(result);
    }
  });
});

//get everything from database
app.get('/api/all', function(req, res){
  testdb.find().toArray(function(err, result){
    if (err) {
      res.json(err);
      throw err;
    }
    if (result) {
      console.log(result);
      res.json(result);
    } else {
      res.json({});
    }
  });
})


//Conversation Calls
// app.get('/api/conversation/inactive', conversationController.listInactiveConversations);
// app.get('/api/conversation/active', conversationController.listActiveConversations);
// app.post('/api/conversation/create', conversationController.createConversation);
// app.get('/api/conversation/activate/:phoneNumber', conversationController.activateConversation);
// app.get('/api/conversation/deactivate/:phoneNumber', conversationController.deactivateConversation);
// app.get('/api/conversation/open/:phoneNumber', conversationController.openConversation);

app.listen(3000, function(){
	console.log('I\'m Listening...');
});