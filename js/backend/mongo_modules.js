var mongoose = require('mongoose');
var schema = require('./schema');
var bcrypt = require('bcrypt-nodejs');



// ********* RETRIEVE ALL DATA ASSOCIATED WITH THE LOGGED IN USER ******** //
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


// *********** CREATE NEW ENTRY IN DATABASE ************** //
    var createNewData = function(req, callback)
    {
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
                    console.log('error occured');
                    callback(err);
                }
            });
        });    
    };

// *********** UPDATE AN ENRTY IN DATABASE ************** //
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
            //var options = {upsert: false};
            //console.log(req.body.data);
            PmsCollection.findOneAndUpdate(query, req.body.data, function(err, doc)
            {
                if (!err)
                {
                    //console.log(doc);
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

/////////////TEMPORARY CHAT STORAGE MODULE ///////////////////////

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
                        //console.log(data);
                        callback('Chat stored Successfully');
                        db.close();
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
/////////////////////////////////////////////////////////////////

// **** UPDATE CHAT MESSAGE FLAG TO NOTIFY USERS OF UNREAD MESSAGES **** //

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
                //console.log(doc);
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

///////////////////////////////////////////////////////////////////////////

// ************** RETRIEVE CHAT DATA ****************//

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
    
///////////////////////////////////////////////////////

// *********** DELETE AN ENTRY FROM DATABASE *************** //
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
    });    
};

// *********** REGISTER NEW USER ************ //
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

// **************** LOGIN USER **************** //

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