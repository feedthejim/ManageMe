import { Accounts } from 'meteor/accounts-base';


 
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});
accountsUIBootstrap3.setLanguage('fr');

Comments.ui.config({
   template: 'bootstrap' // or ionic, semantic-ui
});

Comments.ui.setContent({
  title: 'Commentaires',
  save: 'Sauvegarder',
  reply: 'Répondre',
  edit: 'Editer',
  remove: 'Effacer',
  'placeholder-textarea': 'Insérer votre commentaire',
  'add-button-reply': 'Répondre à ce commentaire',
  'add-button': 'Répondre',
  'load-more': 'Afficher plus de commentaires'
});