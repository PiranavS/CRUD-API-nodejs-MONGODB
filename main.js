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
      Age:req.query.age,
      Rollno:req.query.rollno,
   };
   console.log(response);
   res.end(JSON.stringify(response));
   MongoClient.connect(connectionUrl, function(_err, client) {
      if(_err)
      throw _err;

      console.log("Connected correctly to client");
      var db = client.db('mytestingdb');
      if(req.query.actions=='create')
      {
            db.collection('students').insertOne(response,function(error,result){
            if(error) 
            throw error;
  
            else
            console.log("Success :"+result.ops.length+"   student inserted!");
                 
         });
      }

      else if(req.query.actions=='read')
      {
         var query ={Rollno: response.Rollno};
         db.collection('students').find(query).toArray(function(error,result){
            if(error)
            throw error;

            else
            {
               console.log(result)
            }

         });
      }

      else if(req.query.actions=='update')
      {
         var myquery = {Rollno: response.Rollno};
         var newvalues = { $set:{response}};
         db.collection("students").updateMany(myquery, newvalues, function(err, res) {
    if (err) 
    throw err;

    console.log(res.result.nModified + " document(s) updated");
      });
      }

   else if(req.query.actions=="delete")
   {
      console.log("delete");
      var query ={Rollno: response.rollno}
      db.collection("students").deleteMany(query,function(err,obj){
         if(err)
         throw err;

         console.log(obj.result.n+"documents deleted");
      });

   }
    client.close();
})
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
