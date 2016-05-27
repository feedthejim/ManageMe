import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');



schema= new SimpleSchema({

	column:
	{ type: Number,
		label: "Column",
		autoform: {
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
		autoValue:function(){ return this.userId },
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
    return doc.createdBy === Meteor.userId();
}
});

