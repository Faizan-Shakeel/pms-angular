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
//var MongoStore  = require('connect-mongo')(session);
var LocalStrategy = require('passport-local').Strategy;

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;
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


// ****** INITIALIZING PASSPORT LOCAL STRATEGY ******** //

app.post('/login', passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
}));

app.get('/loginSuccess', function(req, res)
{
   var response = {user: req.user};
   //console.log(req);
   res.send(response); 
});

app.get('/loginFailure', function(req, res)
{
   console.log(req.result);
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

// ************ FILE DETELE *********** //
app.post('/deleteFile', function(req, res)
{
    console.log(req.body.fileUrl);
    fs.unlink(req.body.fileUrl, function(err)
    {
        if (err) 
        {
            res.send(err);
        }
        else
        {
            console.log('successfully deleted');
            res.send('successfully deleted');
        }
    });
});
    

//////////////////////////////////////////

// ********** FILE UPLOAD  ********** //

app.post('/uploads',function(req,res)
{
    var fileExtension = '';
    for (var i = req.files.file.name.length - 1; i>=0; i--)
       {
           fileExtension = req.files.file.name[i] + fileExtension;
           if (req.files.file.name[i] == '.')
           {
               break;
           }
       }
    console.log(fileExtension);   
    fs.readFile(req.files.file.path, function(err, data)
    {       
       var newPath = __dirname + "/uploads/" + req.body.documentName + fileExtension;
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

////////////////////////////////////////////////

// ************ RETRIEVE CHAT DATA ************ //

app.post('/retrieveChat', function(req,res)
{
    console.log(req.body);
    mongoModules.retrieveChat(req, function(chatData)
    {
        res.send(chatData);
    });
});

/////////////////////////////////////////////////

// ************** CHAT FUNCTIONALITY **************** //

var clientIdArray = [];
io.on('connection',function(socket)
{
    socket.on('user-email', function(userData)
    { 
        var checker = 0;
        // * Here we are associating user's socket ID with his email ID
        if (clientIdArray.length == 0)
        {
            clientIdArray.push({'userEmail': userData.userEmail, 'clientId': socket.id});
        }

        else
        {
            // * If the value of checker increases here, it means that the user
            //   aleary exists so we just replace his old socket Id with new one.
            //   If the checker is zero, it means user was not in the list so 
            //   we will add that user.
            for (var i=0; i<clientIdArray.length; i++)
            {
                if (clientIdArray[i].userEmail == userData.userEmail)
                {
                   clientIdArray[i].clientId = socket.id;
                   checker++;
                   break;
                }
            }
            if (checker === 0)
            {
                clientIdArray.push({'userEmail': userData.userEmail, 'clientId': socket.id});
            }
        }
    });
    
    socket.on('message', function(msg)
    {
        // * Find the socket ID of sender and receiver via using 
        //   their respective email IDs
            var sender = clientIdArray.filter(function(key)
            {
                return key.userEmail == msg.userEmail;
            });
            var receiver = clientIdArray.filter(function(key)
            {
                return key.userEmail == msg.receiverEmail;
            });
            io.sockets.to(sender[0].clientId).emit('broadcast', msg);
            // * If receiver is logged in, send him the message. Otherwise, no
            //   need to emit. He will receive the messages when he signs-in. *
            if (receiver[0])
            {
                //console.log('receiver emit called');
                io.sockets.to(receiver[0].clientId).emit('broadcast', msg);
            }
            mongoModules.updateUser({emailID: msg.userEmail, data: msg}, function(response)
            {
                console.log(response);                
            });
            //console.log(msg.userEmail);
            mongoModules.updateUser({emailID: msg.receiverEmail, data: msg}, function(response)
            {
                console.log(response);
            });
            //console.log(msg.receiverEmail);
                
    });
    
    socket.on('disconnect', function()
    {
        //console.log('client disconnected');
        //clientIdArray.length = 0;
    });
        
});

////////// TEMOPORARY USER CHAT STORAGE MODULE ///////////

app.post('/updateUser', function(req,res)
{
    mongoModules.updateUser(req, function(data)
    {
        res.send(data);        
    });

});

/////////////////////////////////////////////////////////

// ---- Listen for incoming connections at port 3000 -- //
http.listen(port,function()
{
    console.log('server at ' + port);
});
////////////////////////////////////////////////////