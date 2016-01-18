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
var http = require('http').Server(app);
var io = require('socket.io')(http);

// *** THIS FEATURE IS UNDER DEVELOPMENT *** //
//var transporter = nodemailer.createTransport({
//    service: 'Yahoo',
//    auth: {
//        user: 'write your email address here',
//        pass: 'password here'
//    }
//});

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
           res.send('success');
       });
    });
});

///////////////////////////////////////////

// *********** SEND EMAIL (UNDER DEVELOPMENT ******** //

//app.post('/sendemail', function(req,res)
//{
//       var mailOptions = {
//        from: 'ghost_stalker323@yahoo.com',
//        to: req.body.receiverEmail,
//        subject: req.body.subject,
//        text: req.body.text
//    };
//    console.log(req.body.receiverEmail);
//    transporter.sendMail(mailOptions,function(err, info)
//    {
//        if (err)
//        {
//            console.log('error sending mail ' + err);
//        }
//        else
//        {
//            console.log('mail sent');
//        }            
//    });
//   res.send('email data received');
//});

////////////////////////////////////////////////////////////

// *********** REGISTER NEW USER ************ //

app.post('/register',function(req,res)
{
    mongoModules.registerUser(req, function(data)
    {
        res.send(data);
    });
});

///////////////////////////////////////////////?

// ************** CHAT FUNCTIONALITY **************** //

var clientIdArray = [];
io.on('connection',function(socket)
{
    socket.on('user-email', function(userData)
    { 
        var checker = 0;
        if (clientIdArray.length == 0)
        {
            clientIdArray.push({'username': userData.username, 'clientId': socket.id});
        }

        else
        {
            for (var i=0; i<clientIdArray.length; i++)
            {
                if (clientIdArray[i].username == userData.username)
                {
                   clientIdArray[i].clientId = socket.id;
                   checker++;
                   break;
                }
            }
            if (checker === 0)
            {
                clientIdArray.push({'username': userData.username, 'clientId': socket.id});
            }
        }
       console.log(clientIdArray);
    });
    
    socket.on('message', function(msg)
    {
            var sender = clientIdArray.filter(function(key)
            {
                return key.username == msg.username;
            });
            var receiver = clientIdArray.filter(function(key)
            {
                return key.username == msg.receiverEmail;
            });
            console.log(sender);
            console.log(receiver);
            io.sockets.to(sender[0].clientId).emit('broadcast', msg);
            io.sockets.to(receiver[0].clientId).emit('broadcast', msg);
    });
    
    socket.on('disconnect', function()
    {
        console.log('client disconnected');
        //clientIdArray.length = 0;
    });
        
});

/////////////////////////////////////////////////////////

// ---- Listen for incoming connections at port 3000 -- //
http.listen(3000,function()
{
    console.log('server at 3000');
});
////////////////////////////////////////////////////