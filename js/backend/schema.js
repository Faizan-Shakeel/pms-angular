var mongoose = require('mongoose');

function schema(userKeys)
{
    var schemaCompany = new mongoose.Schema(
            {
                companyName: String                
            });
    var Schema = mongoose.Schema;
    var schemaProject = new Schema(
               { 
                    companyName: String,
                    project:
                            {
                                name: String,
                                status: String,
                                pendingStatusClass: String,
                                approvedStatusClass: String,
                                inProgressStatusClass: String,
                                completedStatusClass: String,
                                closedStatusClass: String,
                                description: String,
                                id: String,
                                createDate: {type: Date, default: Date.now},
                                dateModified: {type: Date, default: Date.now},
                                createdBy: String,
                                modifiedBy: String,
                                endDate: {type: Date, default: Date.now},
                                noOfUsers: Number,
                                noOfTasks: Number,
                                noOfDocuments: Number,
                                estimatedBudget: Number,
                                targetDate: {type: Date, default: Date.now},
                                documents: [Schema.Types.Mixed],
                                users: [Schema.Types.Mixed],
                                tasks: [Schema.Types.Mixed]
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
                                projectId: String,
                                status: String,
                                pendingStatusClass: String,
                                approvedStatusClass: String,
                                inProgressStatusClass: String,
                                completedStatusClass: String,
                                closedStatusClass: String,
                                endDate: {type: Date, default: Date.now},
                                dateModified: {type: Date, default: Date.now},
                                createdBy: String,
                                lastModifiedBy: String,
                                noOfUsers: Number,
                                numberOfDocuments: Number,
                                createDate: {type: Date, default: Date.now},
                                users: [Schema.Types.Mixed],
                                documents: [Schema.Types.Mixed]
                            }
            });
    var schemaDocuments = new mongoose.Schema(
            {
                    companyName: String,
                    documents:
                                {
                                    name: {type: String},
                                    description: {type: String},
                                    id: {type: String},
                                    fileSize: {type: String},
                                    fileName: {type: String},
                                    fileType: {type: String},
                                    status: String,
                                    createDate: {type: Date, default: Date.now},
                                    createdBy: String,
                                    project: String,
                                    projectId: String,
                                    task: String,
                                    taskId: String,
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
                                gender: String,
                                dateOfBirth: {type: Date},
                                contactNumber: String,
                                address: String,
                                keepLoggedInFlag: String,
                                notifications: [Schema.Types.Mixed],
                                projects: [Schema.Types.Mixed],
                                tasks: [Schema.Types.Mixed],
                                chatData: [Schema.Types.Mixed],
                                unreadMessageFlag: [Schema.Types.Mixed]
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
    if (userKeys == 'documents')
    {
        return schemaDocuments;
    }
    if (userKeys == 'users')
    {
        return schemaUsers;
    }
}
exports.schema = schema;