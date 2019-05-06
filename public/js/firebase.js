

var database = firebase.database();

window.onload=loggedIn();

var userSign;
var pastPapers=[
  "https://www.paked.net/papers/sample_paper_air_university_islamabad.htm",
  "https://www.paked.net/papers/sample_paper_bahria_university_islamabad.htm",
  "https://www.paked.net/papers/sample_paper_air_university_islamabad.htm",
  "https://www.paked.net/papers/sample_paper_iiu_bs_computer_science.htm",
  "https://www.paked.net/papers/sample_paper_nust_engineering_computer_science.htm",
  "https://www.paked.net/papers/",
  "https://www.paked.net/papers/sample_paper_iqra_university.htm",
  "https://www.paked.net/papers/sample_paper_qau_bs_physics.htm",
  "https://www.paked.net/papers/sample_paper_vu_mscs.htm",
  "https://www.paked.net/papers/sample_paper_bahria_university_islamabad.htm"

]
var physicsUniversties=[

  "https://lums.edu.pk/programmes/bs-physics",
  "www.nust.edu.pk",
  "https://lahore.comsats.edu.pk",
  "http://pu.edu.pk/",
  "https://lahore.comsats.edu.pk",
  "https://www.riphah.edu.pk",
  "https://www.ucp.edu.pk",
  "https://www.iiu.edu.pk"
  ]
  
  var fashioUniversities=[
  "https://iqra.edu.pk",
  "https://admissions.umt.edu.pk",
  "https://std.umt.edu.pk",
  "ntu.edu.pk",
  "https://www.hup.edu.pk"
  ]
  
  var computerUniversities=[
  
  "https://www.vu.edu.pk",
  "www.nu.edu.pk",
  "https://itu.edu.pk",
  "https://iqra.edu.pk",
  "https://lums.edu.pk",
  "www.nust.edu.pk",
  "https://bahria.edu.pk",
  "https://www.riphah.edu.pk",
  "https://www.iiu.edu.pk",
  "https://szabist-isb.edu.pk"
  ]
  
 var spaceUniversities=[
  
    "https://www.ist.edu.pk",
    "kaasts.com",
    "www.uok.edu.pk",
    "pu.edu.pk"
  ]
  
  var mathUniversities=[
  "https://www.riphah.edu.pk",
  "https://www.iiu.edu.pk",
  "www.nust.edu.pk",
  "https://lums.edu.pk",
  "https://cust.edu.pk",
  "https://www.vu.edu.pk",
  "preston.edu.pk",
  "ww3.comsats.edu.pk",
  "https://bahria.edu.pk",
  "https://admissions.umt.edu.pk"
  ]
  
  var mechanicUniversities=[
  
    "https://cust.edu.pk ",
    "https://www.iiu.edu.pk",
    "www.ist.edu.pk",
    "https://www.ucp.edu.pk",
    "www.pieas.edu.pk/",
    "www.nust.edu.pk",
    "https://au.edu.pk",
    "www.comwave.edu.pk",
    "ww2.comsats.edu.pk"
  ]
 var politicsUniversities=[
"pu.edu.pk",
"https://admissions.umt.edu.pk",
"qau.edu.pk",
"https://www.juw.edu.pk",
"https://lums.edu.pk",
"uog.edu.pk",
"https://www.iiu.edu.pk",
"gcwuf.edu.pk",
"www.uop.edu.pk",
"usindh.edu.pk",
"https://iqra.edu.pk"

]

function adminSignIn(){


const signInEmail= document.getElementById('adminEmail').value;
const signInPassword=document.getElementById('adminPassword').value;

if(signInEmail==="admin@gmail.com"){

// firebase.auth().createUserWithEmailAndPassword(signInEmail, signInPassword).then(function(user){

  firebase.auth().signInWithEmailAndPassword(signInEmail, signInPassword).then(function(data){
 
    window.location="/admindashboard"
    
    }).catch(function(err){
    window.alert(err);
    })
    
}else{

  window.alert("invalid email or password");
}




}


function signUpForm(){
   
    var signUpName=document.getElementById('signUpName').value;
    var signUpEmail=document.getElementById('signUpEmail').value;
    var signUpPassword=document.getElementById('signUpPassword').value;
    // var signUpOption=document.getElementById('signUpOption').value;

    console.log(signUpName);
    console.log(signUpEmail);
    console.log(signUpPassword);
    // console.log(signUpOption);
   
   
    firebase.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword).then(function(user){
      
 let userId=firebase.auth().currentUser.uid;
console.log(userId);
// userSign=signUpOption;
userSign="Student";
console.log(userSign);



// if(signUpOption==='Student'){
        
                firebase.database().ref('/' + `Student/`+ `/${userId}`+"/profile").set({
                
                "username": signUpName,
                "email": signUpEmail,
                "password":signUpPassword,
                "id":userId
            }).then(function(){
              document.getElementById('signUpEmail').value="";
              document.getElementById('signUpPassword').value="";
             

            console.log("student Added");
             
            sendToken("Student");   
                // console.log(firebase.auth().currentUser.uid)
             
            }).catch(function(){
               console.log("Data not saved")
            });
            


        // }
        
        // else{
        
        //        firebase.database().ref("/"+`${signUpOption}/` + userId).set({ 
        //         username: signUpName,
        //         email: signUpEmail,
        //         password:signUpPassword,
             
        //     }).then(function(){


        //     console.log("Counselor Added")
        //     sendToken(signUpOption);
            
        //     }).catch(function(){
        //         console.log("Counselor not saved")
        //     });
 
        //     }

         

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(error.message)
        // ...
      });

}







function sendToken(userType){

  
 userId=firebase.auth().currentUser.uid;
 console.log(userId);
 console.log("sendtokenfunction",userType)
 if(userType=="Student"){

  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    console.log(idToken) 
    fetch("/token", {
              method: 'POST', // or 'PUT'
              body: JSON.stringify({
                  "token":idToken,
                  "userType":userType
              }), // data can be `string` or {object}!
              headers:{
                'Content-Type': 'application/json'
              }
            }).then(function(){
              
              window.location.href=`/dashboard/test`

            })
            .catch(error => console.error('Token not seent to route'))

            
            }).catch(function(error) {
            console.log("Token not received from firebase")
            }); 


              }
              
              // else{


              //   firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
              //     console.log(idToken) 
              //     fetch("/token", {
              //               method: 'POST', // or 'PUT'
              //               body: JSON.stringify({
              //                   "token":idToken,
              //                   "userType":userType
              //               }), // data can be `string` or {object}!
              //               headers:{
              //                 'Content-Type': 'application/json'
              //               }
              //             }).then(function(){
                            
              //               window.location.href=`http://localhost:3000/dashboard/counselor`

              //             })
              //             .catch(error => console.error('Token not seent to route'))

                          
              // }).catch(function(error) {
              // console.log("Token not received from firebase")
              // }); 

              // }
              }


function loggedIn(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("user is signed in")
          console.log(user)
        }
      });


}


function logOut(){
    firebase.auth().signOut().then(function() {
         fetch("/removeToken", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify({
                "token":""
            }), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(function(){
            window.location.href = "/"
          }).catch(function(error) {
        // An error happened.
      });
})
}

function signInForm(){

    var signInEmail=document.getElementById('signInEmail').value;
    var signInPassword=document.getElementById('signInPassword').value;

   console.log(signInEmail,signInPassword);

  //  var rates = document.getElementById('rates').value;
  //  var userType;
  //  if(document.getElementById('r1').checked){
  //     userType = document.getElementById('r1').value;
   
  //  }else if(document.getElementById('r2').checked){
  //     userType= document.getElementById('r2').value;
   
  //  }
// console.log(userType);
    firebase.auth().signInWithEmailAndPassword(signInEmail, signInPassword).then(function(data){

      userId=firebase.auth().currentUser.uid;
 console.log(userId);
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            
            return fetch("/token", {
                        method: 'POST', // or 'PUT'
                        body: JSON.stringify({
                            "token":idToken,
                            "userType":"Student"
                        }), // data can be `string` or {object}!
                        headers:{
                          'Content-Type': 'application/json'
                        }
                      }).then(function(){
                      
                          window.location.href = `/dashboard/Student/${userId}`
                        
                      })
                      .catch(error => {
                        window.alert("Token not send to route")
                      });
              


           
            
          }).catch(function(error) {
           window.alert("Token not received from firebase")
          });  

        
    }).catch(function(error) {

        // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Wrong email or password");
        // ...  
    
    });




}



function quizData(){

 let  userId=firebase.auth().currentUser.uid;
 console.log(userId);

  var descipline;
  if(document.getElementById('r1').checked){
    descipline = document.getElementById('r1').value;
  
  }else if(document.getElementById('r2').checked){
    descipline= document.getElementById('r2').value;
  
  }else{
    document.getElementById('r3').checked
      descipline= document.getElementById('r3').value;
   
  }


  var fscMarks=document.getElementById('fscMarks').value;
  var matricMarks=document.getElementById('matricMarks').value;
  var customInterest=document.getElementById('customInterest').value;
  var interestType=document.getElementById('interestType').value;
  
  console.log(descipline)
  console.log(fscMarks);
  console.log(matricMarks);
  console.log(interestType);
  console.log(customInterest);


if(customInterest===""){



  switch (interestType) {
    case "Politics":
      quizResult(politicsUniversities,pastPapers,userId);
      break;
    case "Fashion Design":
      quizResult(fashioUniversities,pastPapers,userId);
      break;
    case "Computer":
      quizResult(computerUniversities,pastPapers,userId);
      break;
    case "Physics":
   quizResult(physicsUniversties,pastPapers,userId);
   break;
    case "Space":
      quizResult(spaceUniversities,pastPapers,userId);
      break;
    case "Maths":
      quizResult(mathUniversities,pastPapers,userId);
      break;
      case "Mechanics":
      quizResult(mechanicUniversities,pastPapers,userId);
      break;
      
    }
      
  firebase.database().ref( "/"+`/Student`+`/${userId}`+"/test").set({ 
  
    "descipline":descipline,
    "fscMarks":fscMarks,
    "matricMarks":matricMarks,
    "interestType":interestType,
    "customInterest":customInterest
  }).then(function (user){
  
    window.location=`/dashboard/Student/${userId}`
   
  
  }).catch(function(err){
  
    window.alert(err);
  })
 


  
}else if(customInterest !== "Politics" && customInterest!=="Fashion Design" && customInterest!=="Computer" && customInterest!=="Physics"

  && customInterest!=="Space" && customInterest!=="Maths" && customInterest!=="Mechanics"){


  window.alert("No info has been listed on this website agins this interest")
  window.location="/dashboard/test"


 }else {

  switch (interestType) {
    case "Politics":
      quizResult(politicsUniversities,pastPapers,userId);
      break;
    case "Fashion Design":
      quizResult(fashioUniversities,pastPapers,userId);
      break;
    case "Computer":
      quizResult(computerUniversities,pastPapers,userId);
      break;
    case "Physics":
   quizResult(physicsUniversties,pastPapers,userId);
   break;
    case "Space":
      quizResult(spaceUniversities,pastPapers,userId);
      break;
    case "Maths":
      quizResult(mathUniversities,pastPapers,userId);
      break;
      case "Mechanics":
      quizResult(mechanicUniversities,pastPapers,userId);
      break;
      
    }     
  firebase.database().ref( "/"+`/Student`+`/${userId}`+"/test").set({ 
  
    "descipline":descipline,
    "fscMarks":fscMarks,
    "matricMarks":matricMarks,
    "interestType":interestType,
    "customInterest":customInterest
  }).then(function (user){
  
    window.location=`/dashboard/Student/${userId}`
   
  
  }).catch(function(err){
  
    window.alert(err);
  })
  

 }
 
 
}
 
function quizResult(result,pastPapers,userId){


  firebase.database().ref( "/"+`/Student`+`/${userId}`+"/testResult").set(result).then(function (user){
    
   console.log("result saved")

  }).catch(function(err){

console.log(err)
  })

  firebase.database().ref( "/"+`/Student`+`/${userId}`+"/pastPapers").set(pastPapers).then(function (user){
    
    console.log("papers saved")
 
   }).catch(function(err){
 
 console.log(err)
   })



}







function updateQuiz(){



 
   var descipline;
   if(document.getElementById('r1').checked){
     descipline = document.getElementById('r1').value;
   
   }else if(document.getElementById('r2').checked){
     descipline= document.getElementById('r2').value;
   
   }else{
     document.getElementById('r3').checked
       descipline= document.getElementById('r3').value;
    
   }
 
    var userId=document.getElementById('studentId').value;
   var fscMarks=document.getElementById('fscMarks').value;
   var matricMarks=document.getElementById('matricMarks').value;
   var customInterest=document.getElementById('customInterest').value;
   var interestType=document.getElementById('interestType').value;
   
   console.log(descipline)
   console.log(fscMarks);
   console.log(matricMarks);
   console.log(interestType);
   console.log(customInterest);
   console.log(userId);
 


if(customInterest===""){



  switch (interestType) {
    case "Politics":
      updateQuizResult(politicsUniversities,userId);
      break;
    case "Fashion Design":
      updateQuizResult(fashioUniversities,userId);
      break;
    case "Computer":
      updateQuizResult(computerUniversities,userId);
      break;
    case "Physics":
   updateQuizResult(physicsUniversties,userId);
   break;
    case "Space":
      updateQuizResult(spaceUniversities,userId);
      break;
    case "Maths":
      updateQuizResult(mathUniversities,userId);
      break;
      case "Mechanics":
      updateQuizResult(mechanicUniversities,userId);
      break;
  }
  
  
  firebase.database().ref( "/"+`/Student`+`/${userId}`+"/test").set({ 
 
   "descipline":descipline,
   "fscMarks":fscMarks,
   "matricMarks":matricMarks,
   "interestType":interestType,
   "customInterest":customInterest
 }).then(function (user){
 window.alert("changes saved");
   window.location="/admindashboard"
  
 
 }).catch(function(err){
 
   window.alert(err);
 })
 




}else if (customInterest !== "Politics" && customInterest!=="Fashion Design" && customInterest!=="Computer" && customInterest!=="Physics"

&& customInterest!=="Space" && customInterest!=="Maths" && customInterest!=="Mechanics")  {


  window.alert("No info has been listed on this website agins this interest")
  window.location="/admindashboard"


}else{


  switch (interestType) {
    case "Politics":
      updateQuizResult(politicsUniversities,userId);
      break;
    case "Fashion Design":
      updateQuizResult(fashioUniversities,userId);
      break;
    case "Computer":
      updateQuizResult(computerUniversities,userId);
      break;
    case "Physics":
   updateQuizResult(physicsUniversties,userId);
   break;
    case "Space":
      updateQuizResult(spaceUniversities,userId);
      break;
    case "Maths":
      updateQuizResult(mathUniversities,userId);
      break;
      case "Mechanics":
      updateQuizResult(mechanicUniversities,userId);
      break;
  }
  
  
  firebase.database().ref( "/"+`/Student`+`/${userId}`+"/test").set({ 
 
   "descipline":descipline,
   "fscMarks":fscMarks,
   "matricMarks":matricMarks,
   "interestType":interestType,
   "customInterest":customInterest
 }).then(function (user){
 window.alert("changes saved");
   window.location="/admindashboard"
  
 
 }).catch(function(err){
 
   window.alert(err);
 })
 
}
//  switch (interestType) {
//    case "Politics":
//      updateQuizResult(politicsUniversities,userId);
//      break;
//    case "Fashion Design":
//      updateQuizResult(fashioUniversities,userId);
//      break;
//    case "Computer":
//      updateQuizResult(computerUniversities,userId);
//      break;
//    case "Physics":
//   updateQuizResult(physicsUniversties,userId);
//   break;
//    case "Space":
//      updateQuizResult(spaceUniversities,userId);
//      break;
//    case "Maths":
//      updateQuizResult(mathUniversities,userId);
//      break;
//      case "Mechanics":
//      updateQuizResult(mechanicUniversities,userId);
//      break;
//  }
 
 
//  firebase.database().ref( "/"+`/Student`+`/${userId}`+"/test").set({ 

//   "descipline":descipline,
//   "fscMarks":fscMarks,
//   "matricMarks":matricMarks,
//   "interestType":interestType,
//   "customInterest":customInterest
// }).then(function (user){
// window.alert("changes saved");
//   window.location="/admindashboard"
 

// }).catch(function(err){

//   window.alert(err);
// })


}

function updateQuizResult(result,id){

console.log(result,id);


firebase.database().ref( "/"+`/Student`+`/${id}`+"/testResult").set(result).then(function (user){
    
  console.log("saved")

 }).catch(function(err){

console.log(err)



 })


}