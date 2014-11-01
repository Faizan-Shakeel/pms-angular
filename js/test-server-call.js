/**
 * Created by faizankhan on 1/15/14.
 */

var mongoose = require('mongoose');

function do_something()
{
    var testReturn;
    var mongoConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/test');

    mongoConnection.once('open', function(){

        var schema = new mongoose.Schema(
            {
                project_name: {type: String},
                status: {type: String},
                Department: {type: String},
                Target_Date: {type: Date , default: Date.now},
                Date_Started: {type: Date , default: Date.now},
                Project_Leader: {type: String},
                Budget: {type: Number}
            });

        var projects = db.model('projects',schema);

        projects.find({}, function(err,projects){

            testReturn = projects;

        });

    });

    return testReturn;

}

exports.do_something= do_something;
