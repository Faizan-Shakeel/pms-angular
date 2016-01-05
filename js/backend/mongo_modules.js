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
            PmsCollection.find({companyName:req.body.companyName},function(err, data)
            {
                db.close();
                console.log(data);
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
            newEntry.save(function(err)
            {
                if (!err)
                {
                    console.log('entry saved');
                    db.close();
                    callback('entry saved successfully');
                }
                else
                {
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
        //console.log(req.body);
        var createSchema = schema.schema();
        var PmsCollection = db.model('PmsCollection',createSchema);
                    CompanyData.findOne({companyName:req.body.companyName},function(err,doc)
                    {
                        //console.log(doc);
                        for (var keys in req.body)
                        {
                            console.log(doc[keys]);
                        }
                        res.send("hello");
                        doc[keys] = req.body[keys];
                        doc.save(function()
                        {
                            console.log('done');
                            db.close();
                            callback('Entry Updated Successfully');
                        });               
                    });
    });
}

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
              callback(err)
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
              console.log(err);
              callback('err');
          }
          else if (!data)
          {
              //console.log('no record found');
              callback('noRec');
          }
          else if (data)
          {
              var checkPassword = bcrypt.compareSync(password, data.users.password);
              if (checkPassword)
              {
                  callback(data);
              }
              else
              {
                  callback('0');
              }
          }
       });
    });
};

exports.getData = getData;
exports.createNewData = createNewData;
exports.updateData = updateData;
exports.registerUser = registerUser;
exports.loginUser = loginUser;