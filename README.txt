// MANAGEME v.1
---------------

ManageMe est un outil de management visuel (ex. Trello) adapt� sp�cifiquement pour SAFRAN E&D.

ManageMe est developp� sous le framework fullstack Meteorjs, bas� sur NodeJS, avec une base de donn�es sous Mongo, un theme bootstrap et comme framework visuel, Blaze.

// FEATURES
---------------

-Interface style kanban
-Changements effectu�s en temps r�el
-Systeme d'utilisateur/projets
-Commentaires, tags, indice priorit�
-Historique d'utilisation
-Export disponible sous format excel

// TODO
---------------

-Parametres
-Version mobile (??)
-Transition de Blaze � React (?)
-Systeme de comptes hierarchique
-Plus de donn�es d'utilisateurs

// BUGS
---------------

-Postit mal supprim� apr�s suppression de la colonne/projet
-N�c�ssaire de r�actualiser quelques fois
// INSTALLATION
---------------

1) R�cuperer le projet: 
https://github.com/feedthejim/ManageMe.git

2) Installer Meteor:
https://www.meteor.com/

3) Lancer votre terminal de commandes pr�f�r� et naviguer vers le dossier "ManageMe".

(!) Si vous travaillez derri�re un proxy comme chez SAFRAN, vous allez devoir changer les variables d'environnement suivantes:

Sous Windows:
"SET HTTP_PROXY=http://*identifiant de compte*:*motdepasse*@vipsds1.safran:8080"
"SET HTTPS_PROXY=http://*identifiant de compte*:*motdepasse*@vipsds1.safran:8080"

Sous Linux/Mac:
"export HTTP_PROXY=http//*identifiant de compte*:*motdepasse*@vipsds1.safran:8080"
"export HTTPS_PROXY=http//*identifiant de compte*:*motdepasse*@vipsds1.safran:8080"

4) Executer la commande suivante: "meteor", qui s'occupera de s'occuper de toute les d�pendances du projet. Attendre la fin, puis Meteor se lancera tout seul.

5) L'application est accessible a l'adresse suivante: http://localhost:3000/

// DEPLOIEMENT
---------------

Le lancement en utilisant Meteor est pratique pour le developpement et le prototypage rapide mais pour un d�ploiement grande �chelle, il est possible et pr�f�rable de la packager en application Nodejs pour une facilit� de diffusion (plus besoin de Meteor). Il faut cependant avoir effectu� des tests pour s'assurer d'une stabilit�  de produit finale pouvant r�pondre � une plus grande �chelle.

Voir ce lien pour plus d'info:

https://guide.meteor.com/deployment.html#custom-deployment





