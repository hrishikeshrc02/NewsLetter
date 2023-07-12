const express= require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
 require('dotenv').config();

const app= express();
app.use(express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({extended:true}));
 
app.get("/",function(req,res){

    res.sendFile(__dirname +"/signup.html");
});

app.post("/",function(req,res){
    
const firstName=req.body.fname;
const lastName=req.body.lname;
const mailId=req.body.mailid;
 
const data={
  members:[
    {
        email_address: mailId,
        status: "subscribed",
        merge_fields:{
            FNAME: firstName,
            LNAME: lastName
        }
    }
  ]  
};
  var jsonData =JSON.stringify(data);
  const url='https://us21.api.mailchimp.com/3.0/lists/2a22b78fa9'

  const options={
    method:"POST",
    auth:`${process.env.MAILCHIMP_USER}:${process.env.MAILCHIMP_KEY}`
  }

 const request= https.request(url, options, function(response){
         
    if(response.statusCode==200){
        res.sendFile(__dirname + "/success.html")
    }
    else{
        res.sendFile(__dirname + "/failure.html")
    }
         
         response.on("data", function(data){
            console.log(JSON.parse(data));
         })
  })

  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.POST||3000,function(){
    console.log("Server is LITT");
   
});


