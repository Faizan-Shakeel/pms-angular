var mongoose = require('mongoose');
var schema = require('./schema');
var bcrypt = require('bcrypt-nodejs');



// ********* RETRIEVE ALL DATA ASSOCIATED WITH THE LOGGED IN USER ******** //
    var getData = function(req, callback)
    {
        var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
        db.once('open', function()
        {
            //console.log(req.body.companyName);
            var createSchema = schema.schema('companyName');          
            var PmsCollection = db.model('PmsCollection', createSchema);
            var query = {companyName: req.body.companyName};
            PmsCollection.find(query,function(err, data)
            {
                db.close();
                callback(data);
            });
        });
    };


// *********** CREATE NEW ENTRY IN DATABASE ************** //
    var createNewData = function(req, callback)
    {
        var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
        db.once('open', function()
        {
            console.log('create data called');
            console.log(req.body);
            for (var keys in req.body)
            {
                if (keys != 'companyName')
                {
                    var createSchema = schema.schema(keys);
                }
            }
            var PmsCollection = db.model('PmsCollection', createSchema);
            var newEntry = new PmsCollection(req.body);
            console.log(newEntry);
            newEntry.save(function(err, doc)
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
                    console.log(doc);
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
            console.log(req.body.data);
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
                    callback(err);
                }
            });
        };
    
        if (req.body.id[1] == 'p')
        { 
            updateEntry(req, schemaKey = 'project', idTag = 'project.id');
        }
        else if (req.body.id[1] == 't')
        {
            updateEntry(req, schemaKey = 'tasks', idTag = 'tasks.id');
        }
        else if (req.body.id[1] == 'd')
        {
            updateEntry(req, schemaKey = 'documents', idTag = 'documents.id');
        }
        else if (req.body.idp[1] == 'u')
        {
            updateEntry(req, schemaKey = 'users', idTag = 'users.id');
        }
    });
};

// *********** DELETE AN ENTRY FROM DATABASE *************** //
var deleteData = function(req, callback)
{
    var db = mongoose.createConnection('mongodb://127.0.0.1/pms');
    db.once('open', function()
    {
        var createSchema = schema.schema('companyName');
        var PmsCollection = db.model('PmsCollection',createSchema);

            if (req.body.id[1] == 'p')
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
                        callback(err);
                    }
                });
            }
            else if (req.body.id[1] == 't')
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
              console.log(err);
              callback('err');
          }
          else if (!data)
          {
              //console.log('no record found');
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