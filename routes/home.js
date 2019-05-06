const express=require('express');
const router=express.Router();
const firebase=require("firebase-admin");
let idToken="";

router.get("/",function(req,res){
res.render('home1');
})

router.post("/token",function(req,res){
idToken=req.body.token;

        console.log(req.body.token);
        console.log(req.body.userType)
        res.send("index")
})


router.post("/removeToken",function(req,res){
        idToken=req.body.token;
console.log(idToken);
res.send("token removed")
})


router.get("/login",function(req,res){
res.render("login");

})

router.get("/signup",function(req,res){
        res.render("signup");
        
        })


router.get("/dashboard/student",isAuthenticate,function(req,res){
        res.render('index');
        })

router.get("/dashboard/Student/:id",isAuthenticate,function(req,res){
     let id =req.params.id;
        var db = firebase.database();
        var ref = db.ref("Student/"+id);

// Attach an asynchronous callback to read the data at our posts reference
        ref.once("value", function(snapshot) {

        console.log(snapshot.val());
        res.render("studentdashboard",{"user":snapshot.val()});

        }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        });

           
    })

router.get("/student/show/:id",function(req,res){


        let id =req.params.id;
        var db = firebase.database();
        var ref = db.ref("Student/"+id);

        ref.once("value", function(snapshot) {

        console.log(snapshot.val());
        res.render("showstudent",{"user":snapshot.val()});

        }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        });


})


router.get("/student/edit/:id",function(req,res){


        let id =req.params.id;
        var db = firebase.database();
        var ref = db.ref("Student/"+id);

        ref.once("value", function(snapshot) {

        console.log(snapshot.val());
        res.render("updatequiz",{"user":snapshot.val()});

        }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        });


})


    router.get("/dashboard/counselor/:id",isAuthenticate,function(req,res){
        let id =req.params.id;
           var db = firebase.database();
           var ref = db.ref("Counselor/"+id);
   
   // Attach an asynchronous callback to read the data at our posts reference
           ref.once("value", function(snapshot) {
   
           console.log(snapshot.val());
           res.render("counselordashboard",{"users":snapshot.val()});
   
           }, function (errorObject) {
           console.log("The read failed: " + errorObject.code);
           });
   
              
       })





        router.post("/quiz",function(req,res){
        console.log(req.body.matricNumber,req.body.fscNumber,req.body.customInterest,req.body.interest,req.body.rate);
        res.send("ok");
        })


router.get("/dashboard/test",function(req,res){
        res.render("quiz")
})



// router.get("/example",function(req,res){

//         var db = firebase.database();
//         var ref = db.ref("students/");

// // Attach an asynchronous callback to read the data at our posts reference
// ref.on("value", function(snapshot) {
//   console.log(snapshot.val());
// res.render("example",{"students":snapshot.val()});

// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });


// })



        
router.get("/dashboard/counselor",isAuthenticate,function(req,res){

        var db = firebase.database();
        var ref = db.ref("Student/");

// Attach an asynchronous callback to read the data at our posts reference
        ref.once("value", function(snapshot) {

        console.log(snapshot.val());
        res.render("counselordashboard",{"users":snapshot.val()});

        }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        });
       
        
        
        
        
                        
                })
                


router.get("/adminlogin",function(req,res){

        res.render("adminlogin");

})
router.get("/admindashboard",function(req,res){
              
        var db = firebase.database();
        var ref = db.ref("Student/");
        ref.once("value", function(snapshot) {

                console.log(snapshot.val());
                res.render("admindashboard",{"students":snapshot.val()});
        
                }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
                });
        

      
})

function isAuthenticate(req,res,next){

        firebase.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            return   next();   
        }).catch(function(error) {
         res.redirect('/')
        });

}


        
module.exports=router;