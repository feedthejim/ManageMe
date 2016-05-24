import { Template } from 'meteor/templating';
import { Posts } from '../api/Posts.js';
import { Columns } from '../api/Columns.js';
import './main.html';

window.posts = Posts; //TODO find workaround to linking col and schema
window.columns = Columns;

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
			return el.classList.contains('undraggable'); }
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


