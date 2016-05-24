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
		optional: true,
		autoform: {
			type: "bootstrap-colorpicker",
			defaultValue: '#FFF'
		}
	},
	backgroundColor: {
		type: String,
		optional: true,
		autoform: {
			type: "bootstrap-colorpicker",
			defaultValue: '#286090'
		}
	}
});
Columns.attachSchema(schema);

