import { Template } from 'meteor/templating';
import { Projects } from '../api/Projects.js';
import { Posts } from '../api/Posts.js';
import { Columns } from '../api/Columns.js';
import { History } from '../api/History.js';
import './navbar.html';

Template.projectList.helpers({
    project(){
        var userId = Meteor.user().username;
        return Projects.find({$or: [{canAccess: userId}, {createdBy: userId}]}, { limit : 50});
    }
});

Template.projectHistory.helpers({
    projectHistory(){
        return History.find({project: Router.current().params.project});
    },
    postContent(postId){
        console.log(postId);
        return Posts.findOne({ _id : postId}).description;
    },
    colFromContent(docId){
        console.log(docId);
        return  Columns.findOne({$and: [{columnId : docId}, { project: Router.current().params.project}]}).description;
    },
    createdAt(id){
        console.log(id);
        return id;
    }
});

Template.projectHistory.events({
    'click #flushHistory' : function(event){
        console.log(Router.current().params.project);
        Meteor.call('flushHistory', Router.current().params.project);
    }
});

Template.navbar.helpers({
    projectName(){
        var userId = Meteor.user().username;
        return Projects.findOne({_id : Router.current().params.project}).name;
    },
    projectId(){
        var userId = Meteor.user().username;
        return Projects.findOne({$and: [{$or: [{canAccess: userId}, {createdBy: userId}] }, {_id : Router.current().params.project}]})._id;
    },
    createdBy(){
        var userId = Meteor.user().username;
        console.log(Projects.findOne({_id : Router.current().params.project}));
        return Projects.findOne({_id : Router.current().params.project}).createdBy;
    }
});

Template.navbar.events({
//y a des manieres plus efficaces
    'click .show0': function(e) {
	console.log('yo');
	Session.set("displayLevel", 0)
    },
    'click .show1': function(e) {
	Session.set("displayLevel", 1)
    },
    'click .show2': function(e) {
	Session.set("displayLevel", 2)
    },
    'click .show3': function(e) {
	Session.set("displayLevel", 3)
    },
    'click .show4': function(e) {
	Session.set("displayLevel", 4)
    },
})
