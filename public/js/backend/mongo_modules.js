var mongoose = require('mongoose');
var schema = require('./schema');
var bcrypt = require('bcrypt-nodejs');
var Grid = require('gridfs-stream');
var fs = require('fs');

//var mongoUrl = 'mongodb://bilal:m0ng0d8@ds055875.mlab.com:55875/pmsangular'
var mongoUrl = 'mongodb://127.0.0.1/pms';

/////////////////////////////////////////////////////////////////////////////
// ********* RETRIEVE ALL DATA ASSOCIATED WITH THE LOGGED IN USER ******** //
/////////////////////////////////////////////////////////////////////////////
    var getData = function(req, callback)
    {
        var db = mongoose.createConnection(mongoUrl);
        db.once('open', function()
        {
            var createSchema = schema.schema('companyName');          
            var PmsCollection = db.model('PmsCollection', createSchema);
            var query = {companyName: req.body.companyName};
            PmsCollection.find(query,function(err, data)
            {
                if (!err)
                {
                    for (var i in data)
                    {   
                        //** Here, we ensure that users' list we send back
                        //   to client doesn't include passwords of users. **
                        if (data[i]._doc.users)
                        {
                            delete data[i]._doc.users.password;
                        }
                    }
                    db.close();
                    callback(data);
                }
                else
                {
                    callback(err);
                }
            });
        });
    };

//////////////////////////////////////////////////////////////
// ************** RETRIEVE DATA VIA ID ******************** //
//////////////////////////////////////////////////////////////

var retrieveDataViaId = function(req, callback)
{
    var query;

    var db = mongoose.createConnection(mongoUrl);
    db.once('open', function()
    {
        var collection = db.collection('pmscollections');

        if (req.body.id.indexOf('p') !== -1)
        {
            query = {'projects.id': req.body.id};
        }
        else if(req.body.id.indexOf('t') !== -1)
        {
            query = {'tasks.id': req.body.id};  
        }
        else if(req.body.id.indexOf('d') !== -1)
        {
            query = {'documents.id': req.body.id};  
        }
        else if(req.body.id.indexOf('u') !== -1)
        {
            query = {'users.id': req.body.id};  
        }

        collection.findOne(query, function(err, data)
        {
            if (!err)
            {
                db.close();
                callback(data);
            }
            else
            {
                db.close();
                callback(err);
            }
        });
    });
};


/////////////////////////////////////////////////////////////
// *********** CREATE NEW ENTRY IN DATABASE ************** //
/////////////////////////////////////////////////////////////
    var createNewData = function(req, callback)
    {
        if (req.body.users)
        {
            var hash = bcrypt.hashSync(req.body.users.password);
            req.body.users.password = hash;
        }   

        var db = mongoose.createConnection(mongoUrl);
        db.once('open', function()
        {
            for (var keys in req.body)
            {
                if (keys != 'companyName')
                {
                    var createSchema = schema.schema(keys);
                }
            }
            var PmsCollection = db.model('PmsCollection', createSchema);
            var newEntry = new PmsCollection(req.body);
            newEntry.save(function(err)
            {
                if (!err)
                {
                    db.close();
                    callback('entry saved successfully');
                }
                else
                {
                    db.close();
                    callback(err);
                }
            });
        });    
    };


////////////////////////////////////////////////////////////
// *********** UPDATE AN ENRTY IN DATABASE ************** //
////////////////////////////////////////////////////////////
var updateData = function(req, callback)
{
    var db = mongoose.createConnection(mongoUrl);
    db.once('open', function()
    { 
        var schemaKey;
        var idTag;
        var query = {};
        
        var updateEntry = function(req, schemaKey, idTag)
        {
            var createSchema = schema.schema(schemaKey);
            var PmsCollection = db.model('PmsCollection',createSchema);
            query[idTag] = req.body.id;
            var options = {upsert: true};
            PmsCollection.findOneAndUpdate(query, req.body.data, options, function(err, doc)
            {
                if (!err)
                {
                    db.close();
                    callback('Data Updated Successfully');
                }
                else
                {
                    db.close();
                    callback(err);
                }
            });
        };
    
        if (req.body.id.indexOf('p') !== -1)
        { 
            updateEntry(req, schemaKey = 'project', idTag = 'project.id');
        }
        else if (req.body.id.indexOf('t') !== -1)
        {
            updateEntry(req, schemaKey = 'tasks', idTag = 'tasks.id');
        }
        else if (req.body.id.indexOf('d') !== -1)
        {
            updateEntry(req, schemaKey = 'documents', idTag = 'documents.id');
        }
        else if (req.body.id.indexOf('u') !== -1)
        {
            updateEntry(req, schemaKey = 'users', idTag = 'users.id');
        }
    });
};


//////////////////////////////////////////////////////////
// *************** UPDATE USER PASSWORD *************** //
//////////////////////////////////////////////////////////
var updatePassword = function(req, callback)
{
    var db = mongoose.createConnection(mongoUrl);
    db.once('open', function()
    {
        
        var newPasswordHash = bcrypt.hashSync(req.body.newPassword);
        var createSchema = schema.schema('users');
        var PmsCollection = db.model('PmsCollection',createSchema);
            PmsCollection.findOne({'users.id': req.body.id}, function(err, doc)
            {
                if (!err)
                {
                    var checkPassword = bcrypt.compareSync(req.body.oldPassword, doc.users.password);
                    if (checkPassword)
                    {
                        doc.users.password = newPasswordHash;
                        doc.save(function(error)
                        {
                            if (!error)
                            {
                                db.close();
                                callback('Password Updated Successfully');
                            }
                            else
                            {
                                db.close();
                                callback(error);
                            }
                        });
                    }
                    else
                    {
                        db.close();
                        callback('Incorrect Old Password');
                    }
                }
                else
                {
                    db.close();
                    callback(err);
                }
            });
    });
};

//////////////////////////////////////////////////////////
//************** CHAT STORAGE MODULE *******************//
//////////////////////////////////////////////////////////
var updateUser = function(req, callback)
{
    var db = mongoose.createConnection(mongoUrl);
    db.once('open', function()
    {
            var createSchema = schema.schema('users');
            var PmsCollection = db.model('PmsCollection',createSchema);
            PmsCollection.findOne({'users.email': req.emailID}, function(err, doc)
            {
                if (!err)
                {
                    doc.users.chatData.push(req.msg);                        
                    doc.save(function(error, data)
                    {
                    if (error)
                    {
                        callback(error);
                        db.close();
                    }
                    else
                    {
                        db.close();
                        callback('Chat stored Successfully');
                    }
                    });
                                        
                }
                else
                {
                    db.close();
                    callback(err);
                }
            });
    });
};


////////////////////////////////////////////////////////////////
// **** PASSWORD RECOVERY (STORE NEW TEMPORARY PASSWORD) **** //
////////////////////////////////////////////////////////////////
var passwordRecovery = function(req, callback)
{
    var newPasswordHash = bcrypt.hashSync(req.body.newPassword);
    var db = mongoose.createConnection(mongoUrl);
    db.once('open', function()
    {
        var createSchema = schema.schema('users');
        var query = {'users.email': req.body.userEmail};
        var PmsCollection = db.model('PmsCollection',createSchema);
        PmsCollection.findOne(query, function(err, doc)
        {
            if (!err)
            {
                if (doc)
                {
                    doc.users.password = newPasswordHash;
                    doc.save(function(error)
                    {   
                        if (!error)
                        {
                            db.close();
                            callback('An Email has been sent with your temporary password');
                        }
                        else
                        {
                            db.close();
                            callback(error);
                        }
                    });    
                }
                else
                {
                    db.close();
                    callback('No user found with this email');
                }
                
            }
            else
            {
                db.close();
                callback(err);
            }
        });
    });
};


/////////////////////////////////////////////////////
// ********* UPDATE USER NOTIFICATIONS *********** //
/////////////////////////////////////////////////////

var updateUserNotifications = function(req, callback)
{
    var query = {'users.id': req.body.id};
    var db = mongoose.createConnection(mongoUrl);
    db.once('open', function()
    {
//        var collection = db.collection('pmscollections');
        
        var createSchema = schema.schema('users');
        var PmsCollection = db.model('PmsCollection',createSchema);
        PmsCollection.findOne(query, function(err, doc)
        {
            if (!err)
            {
                doc.users.notifications.push(req.body.notificationData);
                doc.save(function(error, data)
                {
                    if (!error)
                    {
                        db.close();
                        callback('notification updated');
                    }
                    else
                    {
                        db.close();
                        callback(error);
                    }
                });
            }
            else
            {
                db.close();
                callback(err);
            }
        });
    });
};

////////////////////////////////////////////////////
// ********** UPDATE CHAT MESSAGE FLAG ********** //
////////////////////////////////////////////////////
//** The purpose of this function is to update the
//   chat message flag which will be used to check
//   whether the user has any unread messages or not
//   when he logs in. Also, when the user reads his
//   messages, the flag will be updated to show that
//   there are no more unread messages.
var updateChatFlag = function(req, callback)
{
    var db = mongoose.createConnection(mongoUrl);
    db.once('open', function()
    {
        var createSchema = schema.schema('users');
        var PmsCollection = db.model('PmsCollection',createSchema);
        PmsCollection.findOne({'users.email':req.body.userObject.email}, function(err, doc)
        {
            if (!err)
            {
                doc.users.unreadMessageFlag = req.body.userObject.unreadMessageFlag.slice();
                doc.save(function(error, data)
                {
                    if (!error)
                    {
                        db.close();
                        callback('message flag updated');
                    }
                    else
                    {
                        db.close();
                        callback(error);
                    }
                });
            }
            else
            {
                db.close();
                callback(err);
            }
        });
    });
};


///////////////////////////////////////////////////////
// ************** RETRIEVE CHAT DATA ****************//
///////////////////////////////////////////////////////
var retrieveChat = function(req, callback)
{
    var db = mongoose.createConnection(mongoUrl);
    db.once('open', function()
    {
        var createSchema = schema.schema('users');
        var PmsCollection = db.model('PmsCollection',createSchema);
        PmsCollection.findOne({'users.email': req.body.userEmail}, function(err,data)
        {
            if (!err)
            {
                callback(data);
                db.close();
            }
            else
            {
                callback(err);
                db.close();
            }
        });
    });
};


///////////////////////////////////////////////////////////////
// *********** DELETE AN ENTRY FROM DATABASE *************** //
///////////////////////////////////////////////////////////////
var deleteData = function(req, callback)
{
    var db = mongoose.createConnection(mongoUrl);
    db.once('open', function()
    {
        var createSchema = schema.schema('companyName');
        var PmsCollection = db.model('PmsCollection',createSchema);
        
            if (req.body.id.indexOf('p') !== -1)
            {
                PmsCollection.remove({'project.id':req.body.id},function(err,removed)
                {
                    if (!err)
                    {
                        db.close();
                        callback(removed);
                    }
                    else
                    {
                        db.close();
                        callback(err);
                    }
                });
            }
            else if (req.body.id.indexOf('t') !== -1)
            {
                PmsCollection.remove({'tasks.id':req.body.id},function(err,removed)
                {
                    if (!err)
                    {
                        db.close();
                        callback(removed);
                    }
                    else
                    {
                        db.close();
                        callback(err);
                    }
                });
            }
            else if (req.body.id.indexOf('d') !== -1)
            {
                PmsCollection.remove({'documents.id':req.body.id},function(err,removed)
                {
                    if (!err)
                    {
                        db.close();
                        callback(removed);
                    }
                    else
                    {
                        db.close();
                        callback(err);
                    }
                });
            }
            else if (req.body.id.indexOf('u') !== -1)
            {
                PmsCollection.remove({'users.id':req.body.id},function(err,removed)
                {
                    if (!err)
                    {
                        db.close();
                        callback(removed);
                    }
                    else
                    {
                        db.close();
                        callback(err);
                    }
                });                
            }
    });    
};


////////////////////////////////////////////////////////
// *********** UPLOAD USER PROFILE PIC ************** //
////////////////////////////////////////////////////////
var uploadProfilePic = function(req, callback)
{
    var db = mongoose.createConnection(mongoUrl);
    db.once('open', function()
    {
        var gfs = Grid(db.db, mongoose.mongo);
        var writestream = gfs.createWriteStream(
        {
            filename: req.body.fileName
        });
    
        fs.createReadStream(req.files.file.path).pipe(writestream);

        writestream.on('close', function()
        {
            fs.unlink(req.files.file.path, function()
            {
                //* Using fs.unlink to delete 
                //  Temporary File (Garbage Cleaning)*
            });
            
            db.close();
            callback('Picture Uploaded');
        });
    });
};


////////////////////////////////////////////////
// ************* UPLOAD FILES *************** //
////////////////////////////////////////////////
var uploadFiles = function(req, callback)
{
    var db = mongoose.createConnection(mongoUrl);
    db.once('open', function()
    {
        var gfs = Grid(db.db, mongoose.mongo);
        var writestream = gfs.createWriteStream({
            filename: req.body.documentName
        });
        fs.createReadStream(req.files.file.path).pipe(writestream);

        writestream.on('close', function()
        {
            fs.unlink(req.files.file.path, function()
            {
                //* Using fs.unlink to delete 
                //  Temporary File (Garbage Cleaning)*
            });
            
            db.close();
            callback('Success');                                
        });
    });
};


////////////////////////////////////////////////
// ************** DOWNLOAD FILES ************ //
////////////////////////////////////////////////
var downloadFiles = function(req, res)
{
    var db = mongoose.createConnection(mongoUrl);
    db.once('open', function()
    {
        var gfs = Grid(db.db, mongoose.mongo);
        var readstream = gfs.createReadStream(
        {
            filename: req.body.fileName
        });

        readstream.on('error', function(err)
        {
            db.close();
            res.send(err);
        });

        readstream.on('end', function()
        {  
            db.close();
        });

        readstream.pipe(res);
    });
};


////////////////////////////////////////////////////////////////////
// ****** STORE PROFILE PICTURE LOCALLY (GRIDFS TO SERVER) ****** //
////////////////////////////////////////////////////////////////////
var storeProfilePic = function(req, res)
{
    var path = 'public/images/profile_pictures/' + req.body.imageUrl;
    var db = mongoose.createConnection(mongoUrl);
    db.once('open', function()
    {
        var gfs = Grid(db.db, mongoose.mongo);
        var readstream = gfs.createReadStream(
        {
            filename: req.body.imageUrl
        });

        readstream.on('error', function(err)
        {
            db.close();
            res.send(err);
        });

        readstream.on('data', function(chunk)
        {
            fs.appendFile(path, chunk, function(err)
            {
                if (err)
                {
                    db.close();
                    res.send(err);
                }
            });
        });

        readstream.on('end', function()
        {  
            db.close();
            res.send('Profile Picture Stored At Local Directory');
        });
    });
};


////////////////////////////////////////////////
// ************** DELETE FILES ************** //
////////////////////////////////////////////////
var deleteFiles = function(req, callback)
{
    var db = mongoose.createConnection(mongoUrl);
    db.once('open', function()
    {
        var collection = db.collection('fs.files');
        collection.findOne({'filename': req.body.fileName}, function(error, obj)
        {
            if (!error)
            {
                var gfs = Grid(db.db, mongoose.mongo);
                if (obj)
                {
                    gfs.remove(obj, function(err)
                    {
                        if (!err)
                        {
                            db.close();
                            callback('File Successfully Deleted');
                        }
                        else
                        {
                            db.close();
                            callback(err);                
                        }
                    });
                }
            }
            else
            {
                db.close();
                callback(error);
            }
        })
    });
}


////////////////////////////////////////////////
// *********** REGISTER NEW USER ************ //
////////////////////////////////////////////////
var registerUser = function(req, callback)
{
    var hash = bcrypt.hashSync(req.body.users.password);
    req.body.users.password = hash;
    var db = mongoose.createConnection(mongoUrl);
    db.once('open',function()
    {
       var createSchema = schema.schema('users');
       var PmsCollection = db.model('PmsCollection', createSchema);
       var newUser = new PmsCollection(req.body);
       newUser.save(function(err)
       {
          if (err)
          {
              db.close();
              callback(err);
          }
          else
          {
              db.close();
              callback("data saved successfully");
          }
       });
    });
};


//////////////////////////////////////////////////
// **************** LOGIN USER **************** //
//////////////////////////////////////////////////
var loginUser = function(username, password, callback)
{
    var db = mongoose.createConnection(mongoUrl);
    db.once('open',function()
    {
       var createSchema = schema.schema('users');
       var PmsCollection = db.model('PmsCollection', createSchema);
       PmsCollection.findOne({'users.email':username}, function(err, data)
       {
          if (err)
          {
              db.close();
              callback('err');
          }
          else if (!data)
          {
              db.close();
              callback('noRec');
          }
          else if (data)
          {
              var checkPassword = bcrypt.compareSync(password, data.users.password);
              if (checkPassword)
              {
                  db.close();
                  callback(data);
              }
              else
              {
                  db.close();
                  callback('0');
              }
          }
       });
    });
};

exports.getData = getData;
exports.retrieveDataViaId = retrieveDataViaId;
exports.createNewData = createNewData;
exports.updateData = updateData;
exports.deleteData = deleteData;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.updateUser = updateUser;
exports.passwordRecovery = passwordRecovery;
exports.updateUserNotifications = updateUserNotifications;
exports.updatePassword = updatePassword;
exports.retrieveChat = retrieveChat;
exports.updateChatFlag = updateChatFlag;
exports.uploadProfilePic = uploadProfilePic;
exports.uploadFiles = uploadFiles;
exports.storeProfilePic = storeProfilePic;
exports.deleteFiles = deleteFiles;
exports.downloadFiles = downloadFiles;