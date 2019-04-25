

var db = firebase.firestore();

function signUpForm(){
    var signUpName=document.getElementById('signUpName').value;
    var signUpEmail=document.getElementById('signUpEmail').value;
    var signUpPassword=document.getElementById('signUpPassword').value;
    var signUpOption=document.getElementById('signUpOption').value;

    console.log(signUpName);
    console.log(signUpEmail);
    console.log(signUpPassword);
    console.log(signUpOption);

   
    firebase.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword).then(function(user){
        
        if(signUpOption==='Student'){
            db.collection("students").doc().set({
                name:signUpName ,
                email: signUpEmail,
                password: signUpPassword,
                type:signUpOption
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                window.alert("errorCode")
            });
            
        }else{
        
            db.collection("counselors").doc().set({
                name:signUpName ,
                email: signUpEmail,
                password: signUpPassword,
                type:signUpOption
            })
            .then(function() {
                console.log("Document successfully written!");
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
                window.alert("errorCode")
            });
   
            }

    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorCode)
        // ...
      });

}
    


function signInForm(){

    var signInEmail=document.getElementById('signInEmail').value;
    var signInPassword=document.getElementById('signInPassword').value;
console.log(signInEmail,signInPassword)

    firebase.auth().signInWithEmailAndPassword(signInEmail, signInPassword).then(function(data){

        window.alert("logedin")
        
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("errorCode");
        // ...
      });




}