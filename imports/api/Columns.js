import { Mongo } from 'meteor/mongo';
import { Projects } from './Projects.js';

export const Columns = new Mongo.Collection('columns');
schema = new SimpleSchema({

	project: {
		type: String,
		autoform: {
			type: "hidden",
			defaultValue: function(){
				return Router.current().params.project;
			}
		}
		
	},
	columnId:{
		type: Number,
		label: "Column",
		autoform: {
			type: 'select',
			options: function(){
				var object = [];
				for (var i = 1; i < 10; i++)
					object[i] = { label : i, value: i};
				return object;
			}
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
					value: "#5cb85c"
				}, {
					label: "Orange",
					value: "#FF8000"
				}, {
					label: "Rouge",
					value: "#d9534f"
				}, {
					label: "Bleue",
					value: "#5bc0de"
				}];
			}
		}
	}
	,

	createdBy: {
		type: String,
		autoValue: function(){ return Meteor.user().username },
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

if (Meteor.isServer) {
	Meteor.publish('columns', function columnsPublication() {
		return Columns.find();
	});
}
