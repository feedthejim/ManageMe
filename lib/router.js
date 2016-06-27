import { Projects } from '../imports/api/Projects.js';
import { Posts } from '../imports/api/Posts.js';
import { Columns } from '../imports/api/Columns.js';
import { History } from '../imports/api/History.js';

Router.route('/', {
	onBeforeAction: function(){
		if (Meteor.userId()){
			this.next();
		} else {
			this.render('pleaseLogin');
		}
	},
	waitOn: function(){
		return Meteor.subscribe('projects')	;
	},  
		/*data: function(){
			if (this.ready()){
				console.log(Projects.findOne({$or: [{canAccess: userId}, {createdBy: userId}]}));
				var userId = Meteor.userId(); 
				return Projects.findOne({$or: [{canAccess: userId}, {createdBy: userId}]});
			}
		},*/
		action: function(){
			if(this.ready()){
				var userId = Meteor.user().username; 
				console.log(Projects.findOne({$or: [{canAccess: userId}, {createdBy: userId}]})._id);
				Router.go('/'+Projects.findOne({$or: [{canAccess: userId}, {createdBy: userId}]})._id+'/');	
			}
		}
	});

Router.route('/:project/', {
	onBeforeAction: function(){
		if (Meteor.userId()){
			this.next();
		} else {
			this.render('pleaseLogin');
		}
	},
	waitOn: function(){
		return Meteor.subscribe('projects');
	},  
	data: function(){
		if (this.ready()){
			var userId = Meteor.user().username;
			console.log(Projects.findOne({$and: [{$or: [{canAccess: userId}, {createdBy: userId}] }, {_id : this.params.projects}]}));
			return Projects.findOne({$and: [{$or: [{canAccess: userId}, {createdBy: userId}] }, {_id : this.params.project}]});
		}
	},
	action: function() {
		if(this.ready()){
			this.render('mainBoard');
		}
	}
});

Route.route('/:project/historyexport',{
	where: 'server',
	waitOn: function(){
		return [Meteor.subscribe('posts'),Meteor.subscribe('columns'),Meteor.subscribe('history')];
	}, 
	action: function(){
		var data = history.find({project: this.params.project}).fetch();
		var projectId = this.params.project;
		var fields = [
		{
			key: 'description',
			title: 'Description'
		},
		{
			key: 'details',
			title: 'Details'
		},
		{
			key: 'column',
			title: 'Colonnes',
			type: 'string',
			transform: function(val, doc){
				return Columns.findOne({$and: [{project:projectId},{ columnId: parseInt(val)}]}).description;
			}
		}];

		var title = 'History';
		var file = Excel.export(title, fields, data);
		var headers = {
			'Content-type': 'application/vnd.openxmlformats',
			'Content-Disposition': 'attachment; filename=' + title + projectId + '.xlsx'
		};

		this.response.writeHead(200, headers);
		this.response.end(file, 'binary');
		Router.go('/'+projectId);
	}
});

Router.route('/:project/export',{
	where: 'server',
	waitOn: function(){
		return [Meteor.subscribe('posts'),Meteor.subscribe('columns')];
	}, 
	action: function(){
		var data = Posts.find({project: this.params.project}).fetch();
		var projectId = this.params.project;
		var fields = [
		{
			key: 'description',
			title: 'Description'
		},
		{
			key: 'details',
			title: 'Details'
		},
		{
			key: 'column',
			title: 'Colonnes',
			type: 'string',
			transform: function(val, doc){
				return Columns.findOne({$and: [{project:projectId},{ columnId: parseInt(val)}]}).description;
			}
		}];

		var title = 'Posts';
		var file = Excel.export(title, fields, data);
		var headers = {
			'Content-type': 'application/vnd.openxmlformats',
			'Content-Disposition': 'attachment; filename=' + title + '.xlsx'
		};

		this.response.writeHead(200, headers);
		this.response.end(file, 'binary');
		Router.go('/'+projectId);
	}
});

Router.route('/disconnect', function(){

})
