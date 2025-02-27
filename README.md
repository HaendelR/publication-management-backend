# API de Gestion de Publications - NestJS

## Contexte et Objectif

### Contexte

Ce projet consiste à développer une API RESTful pour gérer des publications de type blog. Afin de simplifier l'infrastructure, les données sont stockées dans un fichier JSON, tout en respectant les bonnes pratiques d'architecture logicielle.

## Choix Techniques

1. **Framework** : NestJS pour sa structure modulaire, sa simplicité et son extensibilité.
2. **Stockage des données** : Fichier JSON pour éviter une infrastructure complexe.
3. **Authentification** : Utilisation de JWT pour une gestion sécurisée des sessions utilisateur.
4. **Gestion des rôles** : Mise en place de guards pour restreindre l'accès aux fonctionnalités en fonction des rôles (USER, ADMIN).
5. **Extensibilité** : Structure modulaire pour faciliter l'ajout de nouvelles entités comme les commentaires et les tags.

---

## Structure du Projet

Voici un aperçu de la structure principale du projet :

src/
├── database
├── data
├── service
├── middleware
├── decorators
├── guard
├── jwt
├── modules
├── auth/ # Module pour l'authentification
├── users/ # Module pour la gestion des utilisateurs et rôles
├── post/ # Module pour la gestion des publications (CRUD)

## Instructions pour Lancer l'Application

### Prérequis

- Node.js (version 16 ou supérieure)
- npm (ou yarn)

### Installation

1. Clonez le dépôt
2. Installez les dépendances "npm install"
3. Création du fichier .env contenant les informations
   - JWT_SECRET="ManageBlogPost"
   - DB_NAME_USERS=users
   - DB_NAME_POST=posts
   - PORT=3000
4. Lancer l'application en mode développement "npm run start:dev"
5. L'API sera disponible à l'adresse : http://localhost:3000.
6. Login Admin par default : username: admin, password: Admin123.

### Auteurs

Créé par Haendel Rafaralahy

# Documentation API

Une fois le projet lancer, la documentation de l'api sera accessible sur :
http://localhost:3000/api
