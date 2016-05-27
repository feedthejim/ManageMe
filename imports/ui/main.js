import { Template } from 'meteor/templating';
import { Posts } from '../api/Posts.js';
import { Columns } from '../api/Columns.js';
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


