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
		optional: true,
		autoform: {
			type: "bootstrap-colorpicker",
						defaultValue: '#000'
		}
	},
	backgroundColor: {
		type: String,
		optional: true,
		autoform: {
			type: "bootstrap-colorpicker",
			defaultValue: '#FFF'
		}
	}
	
});




Posts.attachSchema(schema);