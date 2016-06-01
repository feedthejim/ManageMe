import { Mongo } from 'meteor/mongo';

export const Events = new Mongo.Collection('events');

schema = new SimpleSchema({
	label: {
		type: String
	},
	times: {
		type: [Object]
	},
	"times.$.color" : {
		type: String
	},
	"times.$.label" :{
		type: String
	},
	"times.$.starting_time":{
		type: Number
	},
	"times.$.ending_time":{
		type: Number
	},
/*
	createdBy: {
		type: String,
		autoValue: function(){ return this.userId },
		autoform : {
			type: "hidden"
		}
	}
	*/
});
Events.attachSchema(schema);

Events.allow({
	insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId; 
},
update: function(userId, doc) {
    // only allow updating if you are logged in
    return !! userId; 
},
remove: function(userID, doc) {
    //only allow deleting if you are owner
    return doc.createdBy === Meteor.userId();
}
});


