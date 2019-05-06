const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const exphbs=require("express-handlebars");
const admin=require("firebase-admin");
const app=express();

const index=require('./routes/home');

app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
// Use Handlebars view engine
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public'))); 

var serviceAccount = require("./consultingapp.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://consultingapp-ac5fa.firebaseio.com"
});

const port=3000;





app.use("/",index);

app.use(express.static(path.join(__dirname,'public'))); 

  app.use("/",index);
 

  app.listen(port,()=>{

      console.log("server started onport"+port);
  
    })