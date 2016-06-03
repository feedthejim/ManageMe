import { Template } from 'meteor/templating';
import { Posts } from '../api/Posts.js';
import { Columns } from '../api/Columns.js';
import { Events } from '../api/Events.js';
import { Tracker } from 'meteor/tracker';
import { Projects } from '../api/Projects.js';

import './main.html';

window.posts = Posts; //TODO find workaround to linking col and schema
window.columns = Columns;
window.projects = Projects;

var eventHandle;

Template.body.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
    Meteor.subscribe('projects');
    Meteor.subscribe('posts');

    Meteor.subscribe('columns');

    eventHandle = Meteor.subscribe('events');

});

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
        console.log(Projects.find({$or: [{canAccess: Meteor.userId()}, {createdBy: Meteor.userId()}]}));
        return Projects.find({$or: [{canAccess: Meteor.userId()}, {createdBy: Meteor.userId()}]});  
    }
})


Template.footerCalendar.onRendered(function(){
   if(eventHandle.ready()){
    console.log('calender loaded');
    var chart = d3.timeline().stack().margin({left:70, right:30, top:0, bottom:0});
    var testData = Events.find().fetch();
    console.log(Events.find().fetch());
    var svg = d3.select("#timeline").append("svg").attr("width", 1950).datum(testData).call(chart);
    
    Tracker.autorun(function (){
        var testData = Events.find().fetch();
        d3.select("svg").datum(testData).call(chart);
    });}
})

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

    //temporary from here


    drake.on('drop', dropListener);

    // to here
}, 500);


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


