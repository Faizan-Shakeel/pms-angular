var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multiparty = require('connect-multiparty');
var fs = require('fs');
var multipartyMiddleware = multiparty();
var nodemailer = require('nodemailer');
var router = express.Router();
var schema = require('./schema');
var mongoModules = require('./mongo_modules');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore  = require('connect-mongo')(session);
var LocalStrategy = require('passport-local').Strategy;

var app = express();

var transporter = nodemailer.createTransport({
    service: 'Yahoo',
    auth: {
        user: 'write your email address here',
        pass: 'password here'
    }
});

//var db = mongoose.connect('mongodb://127.0.0.1/pms');
//var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
app.use(express.static(__dirname + '/../../../pms-angular'));

app.use(multiparty());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'this is secret',
                 saveUninitialized: true,
                 resave: true,
//                 maxAge: new Date(Date.now() + 3600000),
//                 store: new MongoStore(
//                 {db:mongoose.connection.db}, function(err)
//                        {
//                            console.log(err || 'connect-mongodb setup ok');
//                        })
  }));
app.use(passport.initialize());
app.use(passport.session());


//app.use(multer({dest:'./uploads', 
//    rename: function(fieldname,filename)
//    {
//        return filename+Date.now();
//    },
//    onFileUploadStart: function(file)
//    {
//        console.log(file.originalname + ' is starting ...');
//    },
//    onFileUploadComplete: function(file)
//    {
//        console.log(file.filename + ' uploading complete');
//        done = true;
//    }
// }));


//app.get('/',function(req,res)
//{
//   res.sendFile(__dirname + 'index.html'); 
//});

// ****** INITIALIZING PASSPORT LOCAL STRATEGY ******** //

app.post('/login', passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
}));

app.get('/loginSuccess', function(req, res, next)
{
   var response = {user: req.user};
   //console.log(response);
   res.send(response); 
});

app.get('/loginFailure', function(req, res, next)
{
   //console.log(req.body);
   res.send('0'); 
});


// ******* CONFIGURING PASSPORT JS ******** //

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
        function(username, password, done)
{
    //console.log(username);
    mongoModules.loginUser(username, password, function(result)
    {
        if (result === '0')
        {
            return done(null, false);
        }
        else if(result === 'err')
        {
            console.log ('error occured');
            return done(null, false, {message: 'error occured'});
        }
        else if (result === 'noRec')
        {
            console.log ('no record found');
            return done(null, false, {message: 'no record found'});
        }
        else
        {
            return done(null, result);
        }
    });
}));

passport.serializeUser(function(user, done)
{
    done (null, user);
});

passport.deserializeUser(function(user, done)
{
    done (null, user);
});

// ************ SESSION CHECKING ************ //

app.get('/loggedin',function(req, res)
{
   res.send(req.isAuthenticated() ? req.user : '0'); 
});

// *********** RETRIEVE DATA ASSOCIATED WITH LOGGED IN USER ************** //
app.post('/fetch' , function(req,res)
{
    mongoModules.getData(req, function(data)
    {
        res.send(data);
    });    
});
////////////////////////////////////////////////

// ************* CREATE NEW ENTRY IN DATABASE *************** //
app.post('/create', function(req,res)
{
    mongoModules.createNewData(req, function(response)
    {
       res.send(response); 
    });
});
//////////////////////////////////////////////////////

// ************ UPDATE AN ENTRY IN DATABASE *************** //
app.post('/update', function(req,res)
{
    mongoModules.updateData(req, function(response)
    {
        res.send(response);
    });
});
///////////////////////////////////////////////////

// *********** DELETE DATA FROM DATABASE *********** //
app.post('/delete' , function(req,res)
{  
    mongoModules.deleteData(req, function(response)
    {
       res.send(response); 
    });    
});
///////////////////////////////////////////////////

// ********** FILE UPLOAD  ********** //

app.post('/uploads',function(req,res)
{
    console.log(req.files.file);
    fs.readFile(req.files.file.path, function(err, data)
    {
       var newPath = __dirname + "/uploads/" + req.files.file.name;
       fs.writeFile(newPath, data, function()
       {
           console.log('file uploading complete');
       });
    });
    res.send('success');
});

//////////////////////////////////////////////////////////

////// --------------- Send Email ------------ /////////////

app.post('/sendemail', function(req,res)
{
       var mailOptions = {
        from: 'ghost_stalker323@yahoo.com',
        to: req.body.receiverEmail,
        subject: req.body.subject,
        text: req.body.text
    };
    console.log(req.body.receiverEmail);
    transporter.sendMail(mailOptions,function(err, info)
    {
        if (err)
        {
            console.log('error sending mail ' + err);
        }
        else
        {
            console.log('mail sent');
        }            
    });
   res.send('email data received');
});

////////////////////////////////////////////////////////////

// *********** REGISTER NEW USER ************ //

app.post('/register',function(req,res)
{
//    console.log(req.body);
//    res.send('check');
    mongoModules.registerUser(req, function(data)
    {
        res.send(data);
    });
});

// ---- Listen for incoming connections at port 3000 -- //
app.listen(3000,function()
{
    console.log('server at 3000');
});
////////////////////////////////////////////////////