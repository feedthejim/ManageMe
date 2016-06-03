import { Projects } from '../imports/api/Projects.js';

Router.route('/', {

 onBeforeAction: function(){
     if (Meteor.userId()){
       this.next();
  } else{
       this.render('pleaseLogin');
  }},
  waitOn: function(){
       return Meteor.subscribe('projects');
  },  
  data: function(){
       if (this.ready()){
          console.log(Projects.findOne({$or: [{canAccess: userId}, {createdBy: userId}]}));
          var userId = Meteor.userId(); 
          return Projects.findOne({$or: [{canAccess: userId}, {createdBy: userId}]});
     }},
     action: function() {
       if(this.ready()){
        this.render('mainBoard');
   }
}
}); 
