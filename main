var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var connectionUrl = 'mongodb://localhost';

app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      Name:req.query.name,
      Department:req.query.department,
      Age:req.query.age
   };
   console.log(response);
   res.end(JSON.stringify(response));
   MongoClient.connect(connectionUrl, function(_err, client) {
      if(_err)
      throw _err;

      console.log("Connected correctly to client");
      var db = client.db('mytestingdb');
      var query = {name: response.name};
      db.collection('students').find(query).toArray(function(erro,resu){
          if(erro)
          {
      db.collection('students').insertOne(response,function(error,result){
         if(error) 
         throw error;

         else
         console.log("Success :"+result.ops.length+" student inserted!");
       });
    }
    else 
    console.log("Record Already Found");

    client.close();
      });
})
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
