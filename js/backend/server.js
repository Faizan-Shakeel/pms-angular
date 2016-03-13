var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multiparty = require('connect-multiparty');
var fs = require('fs');
var Grid = require('gridfs-stream');
var multipartyMiddleware = multiparty();
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
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

//////////////////////////////////////////////////////////
// ****** INITIALIZING PASSPORT LOCAL STRATEGY ******** //
/////////////////////////////////////////////////////////

app.post('/login', passport.authenticate('local', {
    successRedirect: '/loginSuccess',
    failureRedirect: '/loginFailure'
}));

app.get('/loginSuccess', function(req, res)
{
   var response = {user: req.user};
   res.send(response); 
});

app.get('/loginFailure', function(req, res)
{
   console.log(req.result);
   res.send('0'); 
});


//////////////////////////////////////////////
// ******* CONFIGURING PASSPORT JS ******** //
//////////////////////////////////////////////

passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
        function(username, password, done)
{
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


////////////////////////////////////////////////
// ************ SESSION CHECKING ************ //
////////////////////////////////////////////////

app.get('/loggedin',function(req, res)
{
   res.send(req.isAuthenticated() ? req.user : '0'); 
});


/////////////////////////////////////////////////////////////////////////////
// *********** RETRIEVE DATA ASSOCIATED WITH LOGGED IN USER ************** //
/////////////////////////////////////////////////////////////////////////////
app.post('/fetch' , function(req,res)
{
    mongoModules.getData(req, function(data)
    {
        res.send(data);
    });    
});


////////////////////////////////////////////////////////
// *********** SET EMAIL CREDENTIALS **************** //
////////////////////////////////////////////////////////

    // var transporter = nodemailer.createTransport({
    // service: 'Yahoo',
    // auth: {
    //    user: 'ghost_stalker323',
    //    pass: 'chacha210'
    //       }
    // });

////////////////////////////////////////////////////////////////
// ************* CREATE NEW ENTRY IN DATABASE *************** //
////////////////////////////////////////////////////////////////
app.post('/create', function(req,res)
{
    mongoModules.createNewData(req, function(response)
    {
       res.send(response); 
    });
});


//////////////////////////////////////////////////////////////
// ************ UPDATE AN ENTRY IN DATABASE *************** //
//////////////////////////////////////////////////////////////
app.post('/update', function(req,res)
{        
    mongoModules.updateData(req, function(response)
    {
        res.send(response);
    });
});


////////////////////////////////////////////////////
// *********** UPDATE USER NOTIFICATIONS ******** //
////////////////////////////////////////////////////
app.post('/updateUserNotifications', function(req, res)
{
    mongoModules.updateUserNotifications(req, function(response)
    {
        res.send(response);
    });
});


///////////////////////////////////////////////////////
// *********** DELETE DATA FROM DATABASE *********** //
//////////////////////////////////////////////////////
app.post('/delete' , function(req,res)
{  
    mongoModules.deleteData(req, function(response)
    {
       res.send(response); 
    });    
});


//////////////////////////////////////////////////////
// ************ RETRIEVE DATA VIA ID ************** //
//////////////////////////////////////////////////////
app.post('/retrieveDataViaId', function(req, res)
{
    mongoModules.retrieveDataViaId(req, function(data)
    {
        res.send(data);
    });
});


/////////////////////////////////////////////////////
// ********* DELETE FILE FROM DATABASE *********** //
/////////////////////////////////////////////////////
app.post('/deleteFile', function(req, res)
{
    mongoModules.deleteFiles(req, function(response)
    {
        res.send(response);
    });
});
    

///////////////////////////////////////////////////
// ********** UPLOAD FILE VIA GRIDFS  ********** //
///////////////////////////////////////////////////
app.post('/uploads',function(req,res)
{
    mongoModules.uploadFiles(req,function(response)
    {
        res.send(response);
    });
});


////////////////////////////////////////////////////
// ********** DOWNLOAD FILE FROM GRIDFS ********* //
////////////////////////////////////////////////////
app.post('/downloadFile', function(req, res)
{
    mongoModules.downloadFiles(req, res);
   //  {
   //      res.send(response);
   //      console.log(res);
   //      var path = 'uploads/' + req.body.fileName;
   //      fs.unlink(path, function()
   //      {
   //          console.log('temporary file removed');
   //      });                    
   // });

    // var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
    // db.once('open', function()
    // {
    //     var gfs = Grid(db.db, mongoose.mongo);
    //     var readstream = gfs.createReadStream(
    //     {
    //         filename: req.body.fileName
    //     });

    //     readstream.pipe(res);

    //     readstream.on('error', function(err)
    //     {
    //         console.log('error occured');
    //         db.close();
    //     });

    //     readstream.on('end', function()
    //     {
    //         db.close();
    //         console.log(res);
    //     })
    // });


});


/////////////////////////////////////////////////////////
// ********** INVITE USER VIA EMAIL ****************** //
/////////////////////////////////////////////////////////


app.post('/inviteUser', function(req,res)
{

  var xoauth2gen = xoauth2.createXOAuth2Generator({
    user: "bilal.mansoor.10@gmail.com",
    clientId: "333669414238-8c5gsn2f559rlu1ve7vvm10m4s2gbbo6.apps.googleusercontent.com",
    clientSecret: "Ph6fJKR-YDXGw_YXxMwF9HXj",
    refreshToken: "1/_E2IbVVZQngzOSoJOx52e37tVpJnGR68TF9YLSYXDQc",
});
  
  xoauth2gen.getToken(function(err, token, accessToken){
    if(err){
        return console.log("error generating token " + err);
    }
    console.log("Authorization: Bearer " + accessToken);
    });

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       // user: req.body.userParameters.senderEmail,
       // pass: req.body.userParameters.senderPassword
          xoauth2: xoauth2.createXOAuth2Generator({
            user: 'bilal.mansoor.10@gmail.com',
            clientId: '333669414238-8c5gsn2f559rlu1ve7vvm10m4s2gbbo6.apps.googleusercontent.com',
            clientSecret: 'Ph6fJKR-YDXGw_YXxMwF9HXj',
            refreshToken: '1/_E2IbVVZQngzOSoJOx52e37tVpJnGR68TF9YLSYXDQc',
            accessToken: 'ya29.nwKmUABuEioCarDfBVkAWt7rpqyZWeUQQ3ronQDMO6959ZUzI5WOvBLRqcElKZb53Q'
              })       
     }
  //    generator.on('token', function(token){
  //   console.log('New token for %s: %s', token.user, token.accessToken);
  // });
  });
    // xoauth2gen.getToken(function(err, token, accessToken)
    // {
    //   if (err)
    //   {
    //     return console.log(err);
    //   }
    //   console.log("token is " + accessToken);
    // })      


      var mailOptions = {
       from: req.body.userParameters.senderEmail,
       to: req.body.userParameters.email,
       subject: req.body.userParameters.subject,
       text: req.body.userParameters.content
   };
   
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


////////////////////////////////////////////////
// *********** REGISTER NEW USER ************ //
////////////////////////////////////////////////
app.post('/register',function(req,res)
{
    mongoModules.registerUser(req, function(data)
    {
        res.send(data);
    });
});

//////////////////////////////////////////////////
// ************ RETRIEVE CHAT DATA ************ //
//////////////////////////////////////////////////
//** The purpose of this function is to retrieve
//   the chat data associated with the logged-in
//   user. **
app.post('/retrieveChat', function(req,res)
{
    console.log(req.body);
    mongoModules.retrieveChat(req, function(chatData)
    {
        res.send(chatData);
    });
});


////////////////////////////////////////////////////////
// ************** CHAT FUNCTIONALITY **************** //
////////////////////////////////////////////////////////
var clientIdArray = [];
io.on('connection',function(socket)
{
    socket.on('user-email', function(userData)
    { 
        var checker = 0;
        //** Here we are associating user's socket ID with his email ID.
        //   If the length of clientIdArray is zero, it means there is 
        //   currently no user in the array so we associte the userEmail 
        //   with socket ID and push it in the array. **
        if (clientIdArray.length == 0)
        {
            clientIdArray.push({'userEmail': userData.userEmail, 'clientId': socket.id});
        }

        else
        {
            //** Here, we first check whether the userEmail is already present in
            //   the clientIdArray or not. If the value of checker increases here, 
            //   it means that the userEmail aleary exists in the array so we just 
            //   replace his old socket Id with new one. If the checker is zero,
            //   it means user was not in the array so we will add that user. **
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
        //** Find the socket ID of sender and receiver via using 
        //   their respective email IDs from the clientIdArray. **
            var sender = clientIdArray.filter(function(key)
            {
                return key.userEmail == msg.userEmail;
            });
            var receiver = clientIdArray.filter(function(key)
            {
                return key.userEmail == msg.receiverEmail;
            });
            io.sockets.to(sender[0].clientId).emit('broadcast', msg);

            //** If receiver is logged in, send him the message. Otherwise, no
            //   need to emit. He will receive the messages when he signs-in.**
            if (receiver[0])
            {
                io.sockets.to(receiver[0].clientId).emit('broadcast', msg);
            }
            mongoModules.updateUser({emailID: msg.userEmail, msg: msg}, function(response)
            {
                console.log(response);                
            });
            mongoModules.updateUser({emailID: msg.receiverEmail, msg: msg}, function(response)
            {
                console.log(response);
            });
    });
    
    socket.on('disconnect', function()
    {
        console.log('client disconnected');
    });
        
});


//////////////////////////////////////////////////
//*********** UPDATE CHAT FLAG *****************//
//////////////////////////////////////////////////
app.post('/updateChatFlag', function(req, res)
{
    mongoModules.updateChatFlag(req, function(response)
    {
        res.send(response);
    })
});


///////////////////////////////////////////////
//********** CHAT STORAGE MODULE ************//
///////////////////////////////////////////////
app.post('/updateUser', function(req,res)
{
    mongoModules.updateUser(req, function(data)
    {
        res.send(data);        
    });

});


/////////////////////////////////////////////////////////////////////
// *** Listen for incoming connections at port (default: 3000) *** //
/////////////////////////////////////////////////////////////////////
http.listen(port,function()
{
    console.log('server at ' + port);
});