# P6-API-Securise-Openclassroom
# Introduction

l'objectif de ce projet, P6-Openclassroom, est de construire une API sécurisée pour une application d'avis gastronomique.
le frontend etant fournie, nous devons nous occupé uniquement du back-end.
cependant, nous aurons besoins de:
1. node.js tout d'abord pour initialiser le repo;

2. git, installation du repo sur github;

3. express et mongoose pour mongoDB;

4. helmet, dotenv, multer;

5. bcrypt, Json Web Tokens (JWT)

# Le site d'avis gastronomiques piquantes
Le site web est authentifiée par utilisateur et mot de passe (route auth).

Les utilisateurs doivent pouvoir:
1. poster des sauces : une route sauce est ajoutée avec un controller (un middleware);
2. modifier et supprimer ses sauces uniquement
3. mettre des likes ou des dislikes 

# Lancer le projet
Installer node.js pour construire le backend et ainsi ajouter les modules nécéssaires cités en introduction

Afin de lancer ce programme vous devez disposer du frontend openclassrooms disponible sur 
https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6.git

Dans un terminal,dans le dossier du frontend, lancez "ng serve".

Dans le dossier de backend, dans un terminal lancez "nodemon server", en ayant les clés stockées dans les variables d'environnement par mon biais. 
Sans cela vous n'aurez pas accès a mongoDB.

# Les principaux modules de node.js utilisés

### Express()
Express est, pour faire court, un framework reposant sur Node, qui facilite la création et la gestion des serveurs Node.
Nous utilisons express() pour la configuration du router. 
Express permet d'appliquer le CRUD à notre application.

### Mongoose
Mongoose est un package (module)node.js.
Il facilite la communication avec une base de donnée mongoDB.
Il permet de :
1. Créer un schéma, 
2. appliquer le CRUD avec notre base de donnée, tout est possible avec Mongoose. 
3. L'utilisation de dotenv pour securiser l'acces a mongoDB.

### Multer
Multer récupère et stocke sur le serveur les fichiers envoyés par les utilisateurs. 
Ici, il est configuré de manière à stocker dans le dossier images/ les images de sauces proposées par chaque utilisateur.

### Dotenv
Dotenv permet de travailler avec des variables d'environnement et sécuriser les mots de passe d'un back-end node.js.

### JWT : JSON Web Tokens
JWT est un module node.js qui permet de crypter les tokens d'authentification envoyés au client pour authentifier leur session, 
selon une clé définie par le développeur. 
Cette clé est généralement stockée dans le fichier .env.

### bcrypt
Bcrypt permet de faire un "hash" du mot de passe du client, de maniere a ce que cette chaine de caractère ne soit pas stockées coté serveur (mais seulement ce hash). 
Ainsi lorsque l'utilisateur se connecte avec son mot de passe, ce mot de passe est de nouveau haché et comparé au hash du serveur. 
Si les deux hash viennent du même mot de passe, les hash se reconnaitront.
