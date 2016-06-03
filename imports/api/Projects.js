import { Mongo } from 'meteor/mongo';

export const Projects = new Mongo.Collection('projects');
schema = new SimpleSchema({
    name: {
        type: String
    },  
    canAccess: {
        type: [String],
        optional: true,
        autoform : {
            types: 'tags'
        }
    },  
    createdBy: {
        type: String,
        autoValue: function(){ return this.userId },
        autoform : {
            type: "hidden"
        }
    }
});

Projects.attachSchema(schema);

Projects.allow({

    insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId; 
}, update: function(userId, doc) {
    // only allow updating if you are logged in
    return !! userId; 
}, remove: function(userID, doc) {
    //only allow deleting if you are owner
    return doc.createdBy === Meteor.userId();
}
});

if (Meteor.isServer) {
  Meteor.publish('projects', function projectsPublication() {
    return Projects.find();
  });
}



