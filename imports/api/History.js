import { Mongo } from 'meteor/mongo';

export const History = new Mongo.Collection('history');
schema = new SimpleSchema({

	project: {
		type: String
	},
	postId:{
		type: String
	},
	movedBy: {
		type: String
	},
	fromCol: {
		type: Number
	},
	toCol: {
		type: Number
	},
	createdOn: {
		type: String
	}
});

History.attachSchema(schema);

History.allow({
	insert: function(userId, doc) {
	// only allow posting if you are logged in
	return true; 
},
update: function(userId, doc) {
	// only allow updating if you are logged in
	return true;
},
remove: function(userID, doc) {
	//only allow deleting if you are owner
	return true;
}
});

if (Meteor.isServer) {
	Meteor.publish('history', function historyPublication() {
		return History.find();
	});
}
