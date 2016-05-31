import { Template } from 'meteor/templating';
import { Posts } from '../api/Posts.js';
import { Columns } from '../api/Columns.js';
import { Tracker } from 'meteor/tracker';
import './main.html';

window.posts = Posts; //TODO find workaround to linking col and schema
window.columns = Columns;

Template.registerHelper('equals',
	function(v1, v2) {
		return (v1 === v2);
	}
	);

Template.registerHelper('not',
	function(v1, v2) {
		switch(v1)
		{
			case 'isColor':
			console.log("checking v2")
			return (v2.indexOf(v1) === -1);
			default:
			return true;
		}
	}
	);

Template.postit.helpers({
	posts(col) {
		return Posts.find({column: col});
	}

});

Template.column.helpers({
	columns() {
		return Columns.find();
	}

});

Template.body.onRendered(function(){
// mauvais workaround
var dragulaWatcher = null;

dragulaWatcher = setInterval(function(){

	if (typeof dragula != 'function') return;

	clearInterval(dragulaWatcher);
	var drake = dragula({
		invalid: function (el, handle) {
			console.log("checking " + Meteor.userId());
			return el.classList.contains('undraggable') || !Meteor.userId(); }
		});

	$('.bloc').each(function(i, obj){
		drake.containers.push(obj);
		console.log(drake.containers);
	});

	drake.on('drop', dropListener);
}, 500);
Tracker.autorun(function (){
	var testData = [
	{label: "person a", times: [{"color":"green", "label":"Weeee", "starting_time": 1355752800000, "ending_time": 1355759900000}, {"color":"blue", "label":"Weeee", "starting_time": 1355767900000, "ending_time": 1355774400000}]},
	{label: "person b", times: [{"color":"pink", "label":"Weeee", "starting_time": 1355759910000, "ending_time": 1355761900000}, ]},
	{label: "person b", times: [{"color":"pink", "label":"Weeee", "starting_time": 1355759910000, "ending_time": 1355761900000}, ]},
	{label: "person b", times: [{"color":"pink", "label":"Weeee", "starting_time": 1355759910000, "ending_time": 1355761900000}, ]},
	{label: "person c", times: [{"color":"yellow", "label":"Weeee", "starting_time": 1355761910000, "ending_time": 1355763910000}]}
	];

	var chart = d3.timeline().stack().margin({left:70, right:30, top:0, bottom:0});

	var svg = d3.select("#timeline").append("svg").attr("width", 1950)
	.datum(testData).call(chart);
})
});


AutoForm.hooks({
	addNotes : {
		before: {
			insert : function(doc){
				console.log(this);
				return doc;
			}
		},
		after: {
			insert : function(err, result)
			{
				console.log(err);
			}
		}
	},
	addColumns : {
		before: {
			insert: function(doc){

				doc.columnId = Columns.find().count() + 1;
				console.log(doc);
				return doc;
			}
		},
		after: {
			insert : function(err, result)
			{
				console.log(err);
			}
		}
	}
}
);

function dropListener(el, target, source, sibling){
	Posts.update(el.id, {$set: {column: parseInt(target.id)}});
	console.log(target);
}


