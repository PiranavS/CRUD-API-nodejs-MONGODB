const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/',(req,res)=>{
    res.send('We are on posts');
});
router.get('/specific',(req,res)=>{
    res.send("Specific Post");
});

router.post('/',(req,res)=>{
    const post = new Post({
        Name:req.body.Name,
        Department:req.body.Department,
        Rollno:req.body.Rollno    
    });

    post.save()
        .then(data =>{
            console.log(data);
        })
        .catch(err=>{
            res.json({message:err});
        });

});

module.exports = router;