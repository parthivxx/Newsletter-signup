const express = require("express");
const request = require("request");
const bodyParser = require("body-parser")
const https = require("https")
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
   res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    // console.log(req.body);
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    let data = {
        members:
      [
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
      ]
    }
    const jsonData  = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/ef24519ef0";
    const options = {
        method:"POST",
        auth:"parthiv69:0eca8d1f10874d07a4f36767b7c8bb19-us21",
    }
    const request = https.request(url,options,function(response){
        response.on("data",function(data){
            if(response.statusCode == 200){
                res.sendFile(__dirname + "/success.html");
            }else{
                res.sendFile(__dirname + "/failure.html");
            }
        })
    });

    request.write(jsonData);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(3000,()=>{
    console.log("Your server is running...");
})

// API --> 0eca8d1f10874d07a4f36767b7c8bb19-us21
//ID --> ef24519ef0