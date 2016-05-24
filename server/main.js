import { Meteor } from 'meteor/meteor';
import { Posts } from '../imports/api/Posts.js';
import { Columns } from '../imports/api/Columns.js';

Meteor.startup(() => {
	if (Posts.find().count() == 0)
	{	
		var tmp = [{column: 1, description: 'hahah', details: 'non',tags: [], fontColor: '#000', backgroundColor:'#FFF'},
			{column: 1, description: 'hello', details: 'oui', fontColor: '#000',tags: [], backgroundColor:'#FFF'},
			{column: 2, description: 'herhe', details: 'non', fontColor: '#000',tags: [], backgroundColor:'#FFF'},
			{column: 2, description: 'huhuh', details: 'non', fontColor: '#000',tags: [], backgroundColor:'#FFF'},
			{column: 3, description: 'nanan', details: 'non', fontColor: '#000',tags: [], backgroundColor:'#FFF'},
			{column: 3, description: 'yo', details: 'non', fontColor: '#000',tags: [], backgroundColor:'#FFF'}];
		for (var i = 0; i < tmp.length; i++)
			Posts.insert(tmp[i]);
	}


	if (Columns.find().count() == 0)
	{
		var tmp = [{columnId: 1, description: 'Demo1', details: 'non', fontColor: '#FFF', backgroundColor:'#286090'},
		{columnId: 2, description: 'Demo2', details: 'non',fontColor: '#FFF', backgroundColor:'#286090'},
		{columnId: 3, description: 'Demo3', details: 'non', fontColor: '#FFF', backgroundColor:'#286090'}];

		for (var i = 0; i < tmp.length; i++)
			Columns.insert(tmp[i]);
	}
	
  // code to run on server at startup
});