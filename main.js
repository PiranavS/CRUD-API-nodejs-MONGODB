var express = require('express');
var app = express();
const mong = require('mongoose');
var connectionUrl = 'mongodb://localhost';
var stud = require('./stud_mod.js');

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

   mong.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false});
   const db = mong.connection;
   db.on('error', console.error.bind(console, 'connection error:'));
   db.once('open', function() {
      console.log("Connected with MONGODB");
   });

   if(req.query.action == "create"){
         var new_stud = new stud({
            name:req.query.name,
            department:req.query.department,
            age:req.query.age,
            rollno:req.query.rollno
         })
         new_stud.save(function(err,result){
            if (err){
                console.log(err);
            }
            else{
                console.log("Inserted Successfully");
            }
         })
   }

   if(req.query.action == "delete"){

      stud.deleteMany({rollno:req.query.rollno},function(err,ret){
         if (err) return handleError(err);
         console.log("Deleted "+ret.deletedCount+" records successfully");
      })

   }

   if(req.query.action == "read"){

      stud.find({rollno:req.query.rollno},function(err,data){
         if (err) return handleError(err);
         else{
            console.log(data);
         }
      })
   }

   if(req.query.action == "update"){

      stud.updateMany({rollno:req.query.rollno}, {$set: {name:req.query.name,department:req.query.department,age:req.query.age}},function(err,doc){
         if (err) return handleError(err);
         else{
            console.log(doc.nModified +" documents updated");
         }

      })
   }


})  

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
