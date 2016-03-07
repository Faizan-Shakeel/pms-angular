var mongoose = require('mongoose');
var schema = require('./schema');
var bcrypt = require('bcrypt-nodejs');
var Grid = require('gridfs-stream');
var fs = require('fs');


/////////////////////////////////////////////////////////////////////////////
// ********* RETRIEVE ALL DATA ASSOCIATED WITH THE LOGGED IN USER ******** //
/////////////////////////////////////////////////////////////////////////////
    var getData = function(req, callback)
    {
        var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
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

        var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
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
    var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
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
            console.log(req.body.data);
            //var options = {upsert: false};
            PmsCollection.findOneAndUpdate(query, req.body.data, function(err, doc)
            {
                if (!err)
                {
                    console.log(doc);
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
//************** CHAT STORAGE MODULE *******************//
//////////////////////////////////////////////////////////
var updateUser = function(req, callback)
{
    var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
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
                        console.log(error);
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
    var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
    db.once('open', function()
    {
        console.log(req.body.userObject.email);
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
                        console.log(data);
                        db.close();
                        callback('message flag updated');
                    }
                    else
                    {
                        console.log(error);
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
    var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
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
    var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
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


////////////////////////////////////////////////
// ************* UPLOAD FILES *************** //
////////////////////////////////////////////////
var uploadFiles = function(req, callback)
{
    console.log(req.body);
    var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
    db.once('open', function()
    {
        var gfs = Grid(db.db, mongoose.mongo);
        var writestream = gfs.createWriteStream({
            filename: req.body.documentName
        });
        fs.createReadStream(req.files.file.path).pipe(writestream);

        writestream.on('close', function()
        {
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
    var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
    db.once('open', function()
    {
        console.log(req.body.fileName);
        var gfs = Grid(db.db, mongoose.mongo);
        var readstream = gfs.createReadStream(
        {
            filename: req.body.fileName
        });

        readstream.pipe(res);

        readstream.on('error', function(err)
        {
            console.log(err);
            db.close();
        });

        readstream.on('end', function()
        {
            db.close();
        });
    });
};


////////////////////////////////////////////////
// ************** DELETE FILES ************** //
////////////////////////////////////////////////
var deleteFiles = function(req, callback)
{
    console.log(req.body.fileName);
    var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
    db.once('open', function()
    {
        var collection = db.collection('fs.files');
        collection.findOne({'filename': req.body.fileName}, function(error, obj)
        {
            if (!error)
            {
                var gfs = Grid(db.db, mongoose.mongo);
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
    var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
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
              console.log('error occured');
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
    var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
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
exports.createNewData = createNewData;
exports.updateData = updateData;
exports.deleteData = deleteData;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.updateUser = updateUser;
exports.retrieveChat = retrieveChat;
exports.updateChatFlag = updateChatFlag;
exports.uploadFiles = uploadFiles;
exports.deleteFiles = deleteFiles;
exports.downloadFiles = downloadFiles;