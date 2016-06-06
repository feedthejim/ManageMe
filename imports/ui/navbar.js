import { Template } from 'meteor/templating';
import { Projects } from '../api/Projects.js';
import './navbar.html';

Template.projectList.helpers({
    project(){
        var userId = Meteor.user().username; 
        return Projects.find({$or: [{canAccess: userId}, {createdBy: userId}]});
    }
});

Template.navbar.helpers({
    projectId(){
        var userId = Meteor.user().username; 
        return Projects.findOne({$and: [{$or: [{canAccess: userId}, {createdBy: userId}] }, {_id : Router.current().params.project}]})._id;
    },
    createdBy(){
        var userId = Meteor.user().username; 
        console.log(Projects.findOne({_id : Router.current().params.project}));
        return Projects.findOne({_id : Router.current().params.project}).createdBy;
    }
})