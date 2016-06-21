import { Template } from 'meteor/templating';
import { Posts } from '../api/Posts.js';
import { Columns } from '../api/Columns.js';
import { Events } from '../api/Events.js';
import { History } from '../api/History.js';
import { Tracker } from 'meteor/tracker';
import { Projects } from '../api/Projects.js';


import './main.html';

window.posts = Posts; //TODO find workaround to linking col and schema
window.columns = Columns;
window.projects = Projects;
window.events = Events;


var windowWidth = new ReactiveVar($(window).width());

window.onresize = function() {
	windowWidth.set($(window).width());
}

var eventHandle;

Template.navbar.events({
	'click #login-buttons-logout': function (event) {
		Router.go('/');
	}
});

Template.body.onCreated(function bodyOnCreated() {
	this.state = new ReactiveDict();
	Meteor.subscribe('projects');
	Meteor.subscribe('posts');
	Meteor.subscribe('columns');
	Meteor.subscribe('history');
	eventHandle = Meteor.subscribe('events');

});

Template.registerHelper('equals',
	function(v1, v2) {
		console.log("comparing "+v1 + " "+ v2);
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
	posts(col, row) {
		console.log('looking for col:' + col +' row: '+ row);
		return Posts.find({$and: [{column: col}, {project: row}]});
	}

});

Template.showColumn.helpers({
	columns(row) {
		console.log('looking for ' + row)
		return Columns.find({project: row});
	}

});

Template.showRow.helpers({
	rows() {
		var user = Meteor.user().username;
		console.log(Projects.find({$or: [{canAccess: user}, {createdBy: user}]}));
		return Projects.find({$or: [{canAccess: user}, {createdBy: user}]});  
	}
})


Template.footerCalendar.onRendered(function(){
	this.autorun(function () {
		if (Router.current().params.project) {
			if(eventHandle.ready()){
				console.log('calender loaded');
				var chart = d3.timeline().stack().margin({left:70, right:30, top:0, bottom:0});
				var testData = Events.find().fetch();
				console.log("fected calendar first");
				var svg = d3.select("#timeline").append("svg").attr("width", windowWidth.get() - 70).datum(testData).call(chart);

				
				Tracker.autorun(function (){
					d3.select("#timeline").selectAll("svg").remove()
					var testData = Events.find().fetch();
					d3.select("#timeline").append("svg").attr("width", windowWidth.get() - 70).datum(testData).call(chart);
					
				});
			}
		}
	})
});

Template.mainBoard.onRendered(function(){
	this.autorun(function () {
		if (Router.current().params.project) {
			console.log('render again');

			var dragulaWatcher = null;

			dragulaWatcher = setInterval(function(){
				if (typeof dragula != 'function') return;

				clearInterval(dragulaWatcher);
				var drake = dragula({
					invalid: function (el, handle) {
						console.log("checking " + el.id);
						return el.classList.contains('undraggable') || !Meteor.userId(); }
					});

				$('.bloc').each(function(i, obj){
					drake.containers.push(obj);
					console.log(drake.containers);
				});
				drake.on('drop', dropListener);
			}, 500);


		}
	})
});


function dropListener(el, target, source, sibling){
	Posts.update(el.id, {$set: {column: parseInt(target.id)}});
	var fromId = Columns.findOne({ project: source.id});
	console.log(new Date().toJSON());
	History.insert({project: Router.current().params.project, postId: el.id, 
		movedBy: Meteor.user().username, fromCol: source.id, toCol: target.id
		, createdOn : new Date().toJSON().slice(0,16)})
	console.log({project: Router.current().params.project, postId: el.id, 
		movedBy: Meteor.user().username, fromCol: source.id, toCol: target.id});
};


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

				//doc.columnId = Columns.find().count() + 1;
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
	},
	addProjects : {
		after: {
			insert: function(err, result){
				var tmp = {project : this.docId,  description: 'Backlog',
				details: 'Groupe de stories', fontColor:'#FFFFFF', backgroundColor: '#FF8000', columnId : 1,createdBy: Meteor.user().username };

				Columns.insert(tmp);
			} 
		}
	},
	removeProject : {

		onSuccess: function(formType, result){
			Posts.remove({project: this.docId});
			Columns.remove({project: this.docId});
		}
		
	}
	
});

Template.removeColumnModal.helpers({
	columnCleanse: function(){
		return  function(){
			console.log(this);
			Posts.remove({$and: [{project: result.project}, {column :result.columnId}]});
		}
	},
});
