const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const exphbs=require("express-handlebars");



// mongoose.connect('mongodb://localhost/passportapp',{ useNewUrlParser: true });
// const db=mongoose.connection;
const port=3000;
const app=express();

const index=require('./routes/index');

app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
// Use Handlebars view engine
app.set('view engine', '.hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public'))); 

// app.use(cookieParser());

// app.use(expressSession({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true
// }));
// passport middleware
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
// app.use(flash());
// app.use((req,res,next)=>{
//   res.locals.success_msg=req.flash('success_msg');
//   res.locals.error_msg=req.flash('error_msg');
//   res.locals.error=req.flash('error');
//   res.locals.user=req.user || null
//   next();
// })


// express validator
// app.use(expressValidator({
//     errorFormatter: (param, msg, value) => {
//         const namespace = param.split('.')
//         root    = namespace.shift()
//          formParam = root;
  
//       while(namespace.length) {
//         formParam += '[' + namespace.shift() + ']';
//       }
//       return {
//         param : formParam,
//         msg   : msg,
//         value : value
//       };
//     }
//   }));

  app.use("/",index);
 

  app.listen(port,()=>{
      console.log("server started onport"+port);
  })