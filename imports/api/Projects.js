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
		autoValue: function(){  return Meteor.user().username },
		autoform : {
			type: "hidden"
		}
	}
});

Projects.attachSchema(schema);

Projects.allow({

	insert: function(userId, doc) {

		return !! userId; 
	}, 
	update: function(userId, doc) {
		return !! userId; 
	}, 
	remove: function(userID, doc) {
		return doc.createdBy === Meteor.user().username;
	}
});

if (Meteor.isServer) {
	Meteor.publish('projects', function projectsPublication() {
		return Projects.find();
	});
}



