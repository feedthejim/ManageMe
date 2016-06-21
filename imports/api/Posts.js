import { Mongo } from 'meteor/mongo';
import { Columns } from './Columns.js';
import { Projects } from './Projects.js';

export const Posts = new Mongo.Collection('posts');



schema= new SimpleSchema({

	project: {
		type: String,
		//autoValue: function(){},
		autoform: {
			type: "hidden",
			defaultValue: function(){
				return Router.current().params.project;
			}
		}
	},

	column:{
		type: Number,
		label: "Column",
		autoform: {
			type: 'hidden',
			defaultValue: 1
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
	tags: {
		type: [String],
		optional: true,
		autoform: {
			type: 'tags'
		}

	},
	fontColor: {
		type: String,
		autoform: {
			defaultValue : "#FFFFFF",
			type: "hidden"
		}
	},
	priority: {
		type: Number,
		min: 0,
		autoform: {
			defaultValue: 1,
			type: "select",
			options: function(){
				return {
					0 : "0",
					1 : "1",
					2 : "2",
					3 : "3",
					4 : "4",
					5 : "5"
				};
			}
		}
	},
	backgroundColor: {
		type: String,
		optional: true,
		autoform: {
			defaultValue : "url('bg-bt-red.png')",
			type: "select-radio",
			options: function() {
				return [{
					label: "Bleue",
					value: "#5bc0de"
				}, {
					label: "Vert",
					value: "#5cb85c"
				}, {
					label: "Orange",
					value: "#FF8000"
				}, {
					label: "Rouge",
					value: "#FF0000"
				}, {
					label: "Fond perso rouge",
					value: "url('bg-bt-red.png')"
				}, {
					label: "Fond perso vert",
					value: "url('bg-bt-green.png')"
				}, {
					label: "Fond perso bleue",
					value: "url('bg-bt-blue.png')"
				}];
			}
		}
	},

	createdBy: {
		type: String,
		autoValue:function(){ return Meteor.user().username },
		autoform : {
			type: "hidden"
		}
	}
});

Posts.attachSchema(schema);
Posts.allow({
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
	return doc.createdBy === Meteor.user().username;
}
});
if (Meteor.isServer) {
	Meteor.publish('posts', function postsPublication() {
		return Posts.find();
	});
}
