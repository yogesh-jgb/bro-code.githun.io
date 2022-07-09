const express = require('express');
const res = require('express/lib/response');
const router = express.Router(); 
const fs=require("fs");
router.get('/', function (req, res) {
  fs.readdir("./files",function(err,files){
    res.render("index", {files:files,data:"",filename:""});
  })
  });

  router.get("/createfile",function(req,res){
    fs.writeFile(`./files/${req.query.file}`,"",function(err){
      if(err) res.send(err);
      else{ 
        res.redirect("/");
      }
    })
    })

  router.get("/delete/:plc",function(req,res){
    fs.unlink(`./files/${req.params.plc}`,function(err){
      if(err)res.send(err)
      else{
        res.redirect("/")
      }
    })
  });
  
  router.get("/read/:plc",function(req,res){
    fs.readFile(`./files/${req.params.plc}`,"utf8",function(err,data){
      fs.readdir("./files",function(err,files){
        res.render("index",{files,data, filename: req.params.plc})
      })
    })
  })

  router.post("/save/:plc",function(req,res){
    fs.writeFile(`./files/${req.params.plc}`,req.body.filedata,function(err){
      if(err) res.send(err)
      else{
        res.redirect(`/read/${req.params.plc}`)
      }
    })
  })
module.exports=router
