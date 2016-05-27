import { Mongo } from 'meteor/mongo';

export const Columns = new Mongo.Collection('columns');
schema = new SimpleSchema({
	columnId:
	{	type: Number,
		label: "Column",
		autoform: {
			defaultValue : 1,
			type: "hidden"
		}
	},
	description:{
		type: String,
		label: "Description",
		max: 200
	},
	details: {
		type: String,
		label: "Details",
		max: 200
	},
	fontColor: {
		type: String,
		autoform: {
			defaultValue : "#FFFFFF",
			type: "hidden"
			
		}
	},
	backgroundColor: {
		type: String,
		optional: true,
		autoform: {
			type: "select-radio",
			options: function() {
				return [{
					label: "Vert",
					value: "#00FF00"
				}, {
					label: "Orange",
					value: "#FF8000"
				}, {
					label: "Rouge",
					value: "#FF0000"
				}];
			}
		}
	}
	,
	createdBy: {
		type: String,
		autoValue: function(){ return this.userId },
		autoform : {
			type: "hidden"
		}
	}
});
Columns.attachSchema(schema);

Columns.allow({
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


