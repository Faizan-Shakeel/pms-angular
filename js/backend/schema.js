var mongoose = require('mongoose');

function schema(userKeys)
{
    var schemaCompany = new mongoose.Schema(
            {
                companyName: String                
            });
    
    var schemaProject = new mongoose.Schema(
               { 
                    companyName: String,
                    project:
                            {
                                name: String,
                                status: String,
                                description: String,
                                id: String,
                                createDate: {type: Date, default: Date.now},
                                dateModified: {type: Date, default: Date.now},
                                createdBy: String,
                                modifiedBy: String,
                                endDate: {type: Date, default: Date.now},
                                noOfUsers: Number,
                                noOfTasks: Number,
                                noOfFiles: Number,
                                estimatedBudget: Number,
                                targetDate: {type: Date, default: Date.now},
                                files: [{name: String}],
                                users: [{name: String}],
                                tasks: [{name: String}]
                            }
                });
    var schemaTasks = new mongoose.Schema(
            {
                    companyName: String,
                    tasks:
                            {
                                name: String,
                                targetDate: {type: Date, default: Date.now},
                                description: String,
                                id: String,
                                project: String,
                                status: String,
                                endDate: {type: Date, default: Date.now},
                                dateModified: {type: Date, default: Date.now},
                                createdBy: String,
                                lastModifiedBy: String,
                                noOfUsers: Number,
                                numberOfFiles: Number,
                                createDate: {type: Date, default: Date.now},
                                users: [{name: String}],
                                files: [{name: String}],
                            }
            });
    var schemaFiles = new mongoose.Schema(
            {
                    companyName: String,
                    files:
                            {
                                name: String,
                                description: String,
                                id: String,
                                size: Number,
                                type: String,
                                createDate: {type: Date, default: Date.now},
                                createdBy: String,
                                project: String,
                                tasks: String,
                                url: String
                            }
            });
    var schemaUsers = new mongoose.Schema(
            {       
                    companyName: String,
                    users:
                            {
                                name: String,
                                email: String,
                                id: String,
                                position: String,
                                imageUrl: String,
                                password: String,
                                projectAndRole: String
                            }
            });
            
    if (userKeys == 'companyName')
    {
        return schemaCompany;
    }
    if (userKeys == 'project')
    {
        return schemaProject;
    }
    if (userKeys == 'tasks')
    {
        return schemaTasks;
    }
    if (userKeys == 'files')
    {
        return schemaFiles;
    }
    if (userKeys == 'users')
    {
        return schemaUsers;
    }
}
exports.schema = schema;