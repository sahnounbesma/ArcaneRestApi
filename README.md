# Arcane Rest APi


Dans le cadre d'un projet de création d'une application web de gestion immobilière, ce projet propose un microservice permettant à un utilisateur de renseigner un bien immobilier avec les caractéristiques suivantes : nom, description, type de bien, ville, pièces, caractéristiques des pièces, propriétaire) et de consulter les autres biens disponibles sur la plateforme. 



### Pré-requis

- avoir un système de gestion de base de données : MongoDB
- avoir un environnement python
- Utilisation de POSTMAN pour les requêtes HTTP

### Installation

- installer les dépendances contenues dans le fichier requirements.txt 
- git clone https://github.com/sahnounbesma/ArcaneRestApi.git
- Une base de donnée contenant déjà des exemples a été déjà crée. Pour pouvoir l'utiliser, il faut créer une base de données sur MongoDb avec "gestion-immob" comme nom. Par la suite il faut créer deux collection "user" et "bien".  Dans chaque collection, il faut importer le fichier JSON associé     "user.json et "bien.json" respectivement. Les deux fichier JSON se trouve dans le dossier gestionImmob/databse/bdd-test . De plus, ce dossier contient un fichier texte contenant les pseudo avec les passwords non hashés appropriés afin de pouvoir réaliser l'authentification. 


## Démarrage

Pour lancer le projet, exécutez : python run.py


## Utilisation ---->   Les URLS pour accéder aux fonctionnalités

- Renseignement des informations personnelles d'un utilisateur sur la plateforme (pseudo , password, nom, prénom, date de naissance) :
	Requête POST :  - URL : http://127.0.0.1:5000/api/auth/signup  
					- exemple du Body de la requête : 
					  { "pseudo": "janedoe",
    					"password": "1234",
    					"nom": "Doe",
    					"prenom": "Jane",
    					"date_naissance": "01-01-1970"
  					  }
  	Il est à noter que le mot de passe "password" est hashé avant d'être ajouté à la base de donnée en utilisant la fonction de hashage bcrypt. 


- Modification des informations personnelles d'un utilisateur sur la plateforme (pseudo , password, nom, prénom, date de naissance) :
	Requête PUT :  - URL : http://127.0.0.1:5000/api/auth/signup  
				   - exemple du Body de la requête : 
					  { 
    					"prenom": "John"
  					  }

- Visualisation de la liste de tous les utilisateurs :
	Requête GET :  - URL : http://127.0.0.1:5000/api/user 


- Visualisation des informations d'un seul utilisateur :
	Requête GET :  - URL : http://127.0.0.1:5000/api/users/<id-utilisateur> 


- Renseignement des caractéristiques d'un bien (changer le nom, ajouter une pièce, etc… ) : 

**** Etape 1: Pour réaliser cette fonctionnalité, j'ai ajouté un système d'authentification des utilisateurs avec JWT (JSON Web Token). 
     Une fois l'utilisateur authentifié avec son pseudo et son password, un token (jeton) lui sera déliveré avec lequel il aura l'autorisation d'ajouter le bien. 
     Pour obtenir ce jeton, une requête POST doit être effectué avec l'URL : http://127.0.0.1:5000/api/auth/login
     Le corps de la requête doit contenir le pseudo et le password de l'utilisateur  
     Le but de cette procédure et de sauvegarder l'utilisateur qui a ajouté le bien pour lui permettre de le modifier par la suite dans le champ "added_by" dans la BDD

**** Etape 2: Pour renseigner les informations du bien :
	 Requête POST : - URL : http://127.0.0.1:5000/bien
				    - exemple du Body de la requête : 
  						{
    					"nom": "maison de Jane",
    					"description": "belle et spacieuse",
    					"type_bien": "Maison",
    					"pieces": 5,
    					"ville": "Lyon",
    					"caracteristiques": ["420m^2"],
    					"proprietaire": "Jane"
  						}				    
  - Dans la requête, il faut spécifier dans " Authorisation ", Type = "Bearer Token" et renseigner le token obtenu lors de l'authentification utilisateur dans la section "Token"
 


- Consultation uniquement des biens d'une ville particulière par les utilisateurs
	Requête GET :  - URL : http://127.0.0.1:5000/biens/cond/<ville> 
				
- Visualisation de la liste de tous les biens :
	Requête GET :  - URL : http://127.0.0.1:5000/api/bien


- Visualisation des informations d'un seul bien :
	Requête GET :  - URL : http://127.0.0.1:5000/api/biens/<id-bien> 


- Fonctionnalité bonus : Un propriétaire ne peut modifier que les caractéristiques de son bien sans avoir accès à l'édition des autres biens :

**** Etape 1: Pour réaliser cette fonctionnalité, j'ai ajouté un système d'authentification des utilisateurs avec JWT (JSON Web Token). 
     Une fois l'utilisateur authentifié avec son pseudo et son password, un token (jeton) lui sera déliveré avec lequel il aura l'autorisation de modifier le bien qu'il a lui même renseigné auparavant. 
     Pour obtenir ce jeton, une requête POST doit être effectué avec l'URL : http://127.0.0.1:5000/api/auth/login
     Le corps de la requête doit contenir le pseudo et le password de l'utilisateur  

**** Etape 2: Pour modifier les informations du bien :
	 Requête PUT :  - URL : http://127.0.0.1:5000/biens/<id_bien>  
				    - exemple du Body de la requête : 
				    			{ "nom": "nouveau nom",
				    			  "piece": 3
				    		    }
				    - Dans la requête, il faut spécifier dans " Authorisation ", Type = "Bearer Token" et renseigner le token obtenu lors de l'authentification utilisateur dans la section "Token"




## Réalisé avec

- Langage : Python
- Framework : Flask
- Base de données : MongoDB



## Auteurs

* **Besma SAHNOUN** _alias_ [@sahnounbesma](https://github.com/sahnounbesma)
