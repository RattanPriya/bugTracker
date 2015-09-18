var express      = require('express'),
  app            = express(),
  bodyParser     = require('body-parser'),
  cookieParser   = require('cookie-parser'),
  session        = require('express-session'),
  morgan         = require('morgan');

var url = 'mongodb://localhost:27017/test';
var db = require('mongoskin').db(url);
var testdb = db.collection("test");

//app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret : 'keyboard cat'}));

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
app.get('/sequence', function(req, res){
  res.sendFile(__dirname + '/client/views/sequence.html');
});

//Can pass data through url
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

//Can post data with ajax call
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

//Can pull everything from the database
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
});

app.listen(80, function(){
  console.log('I\'m Listening...');
});
