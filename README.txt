// MANAGEME v.1
---------------

ManageMe est un outil de management visuel (ex. Trello) adapté spécifiquement pour SAFRAN E&D.

ManageMe est developpé sous le framework fullstack Meteorjs, basé sur NodeJS, avec une base de données sous Mongo, un theme bootstrap et comme framework visuel, Blaze.

// FEATURES
---------------

-Interface style kanban
-Changements effectués en temps réel
-Systeme d'utilisateur/projets
-Commentaires, tags, indice priorité
-Historique d'utilisation
-Export disponible sous format excel

// TODO
---------------

-Parametres
-Version mobile (??)
-Transition de Blaze à React (?)
-Systeme de comptes hierarchique
-Plus de données d'utilisateurs

// BUGS
---------------

-Postit mal supprimé après suppression de la colonne/projet
-Nécéssaire de réactualiser quelques fois
// INSTALLATION
---------------

1) Récuperer le projet: 
https://github.com/feedthejim/ManageMe.git

2) Installer Meteor:
https://www.meteor.com/

3) Lancer votre terminal de commandes préféré et naviguer vers le dossier "ManageMe".

(!) Si vous travaillez derrière un proxy comme chez SAFRAN, vous allez devoir changer les variables d'environnement suivantes:

Sous Windows:
"SET HTTP_PROXY=http://*identifiant de compte*:*motdepasse*@vipsds1.safran:8080"
"SET HTTPS_PROXY=http://*identifiant de compte*:*motdepasse*@vipsds1.safran:8080"

Sous Linux/Mac:
"export HTTP_PROXY=http//*identifiant de compte*:*motdepasse*@vipsds1.safran:8080"
"export HTTPS_PROXY=http//*identifiant de compte*:*motdepasse*@vipsds1.safran:8080"

4) Executer la commande suivante: "meteor", qui s'occupera de s'occuper de toute les dépendances du projet. Attendre la fin, puis Meteor se lancera tout seul.

5) L'application est accessible a l'adresse suivante: http://localhost:3000/

// DEPLOIEMENT
---------------

Le lancement en utilisant Meteor est pratique pour le developpement et le prototypage rapide mais pour un déploiement grande échelle, il est possible et préférable de la packager en application Nodejs pour une facilité de diffusion (plus besoin de Meteor). Il faut cependant avoir effectué des tests pour s'assurer d'une stabilité  de produit finale pouvant répondre à une plus grande échelle.

Voir ce lien pour plus d'info:

https://guide.meteor.com/deployment.html#custom-deployment





