API REST
========

# Principes fondamentaux

*EndPoint* : un endpoint est composé d'un VERBE HTTP + URL
Chaque EndPoint *est unique* ! ==> la combinaison VERBE HTTP + URL est unique

Exemples de EndPoint : 
 - GET "/lists" ---> récupérer toutes les listes
 - GET "/lists/:idList" ---> récupérer une liste en particulier 
 - POST "/lists" ---> ajouter une nouvelle liste

 - GET "/cards" ---> récupérer toutes les cartes
 - PATCH "/cards/:idCard" ---> modifier une carte en particulier

Une action possible avec l'API (exemple récupérer toutes les listes) correspond à *un seul et unique* EndPoint
1 EndPoint === 1 action (Create, Read, Update, Delete...) 

Toutes les données échangées entre les clients et l'API sont au format JSON
Pour les requêtes : body au format JSON
Pour les réponses : contenu au format JSON

# Tableau des EndPoints pour liste

|  Verbe HTTP | Url        | Nom du routeur | Contrôleur & méthode   | Model & méthodes     | Description                  |
|-------------|------------|----------------|------------------------|----------------------|------------------------------|
| GET         | /lists     | listRouter     | listController.getAll  | List.findAll         | Renvoi toutes les listes     |
| GET         | /lists/:id | listRouter     | listController.getById | List.findByPk        | Renvoi une liste             |
| POST        | /lists     | listRouter     | listController.create  | List.create          | Crée une nouvelle liste      |
| DELETE      | /lists/:id | listRouter     | listController.remove  | List.delete          | Supprime une liste existante |
| PATCH       | /lists/:id | listRouter     | listController.update  | List.update          | Modifie une liste existante  |

|  Verbe HTTP | Url        | Nom du routeur | Contrôleur & méthode   | Model & méthodes     | Description                  |
|-------------|------------|----------------|------------------------|----------------------|------------------------------|
| GET         | /cards     | Cardrouter     | cardController.getAll  | Card.findAll         | Renvoi toutes les cartes     |
| GET         | /cards/:id | Cardrouter     | cardController.getById | Card.findByPk        | Renvoi une carte             |
| POST        | /cards     | Cardrouter     | cardController.create  | Card.create          | Crée une nouvelle carte      |
| DELETE      | /cards/:id | Cardrouter     | cardController.remove  | Card.delete          | Supprime une carte existante |
| PATCH       | /cards/:id | Cardrouter     | cardController.update  | Card.update          | Modifie une carte existante  |

|  Verbe HTTP | Url        | Nom du routeur | Contrôleur & méthode   | Model & méthodes     | Description                  |
|-------------|------------|----------------|------------------------|----------------------|------------------------------|
| GET         | /tags      | Tagrouter      | tagController.getAll   | Tag.findAll          | Renvoi toutes les tags       |
| GET         | /tags/:id  | Tagrouter      | tagController.getById  | Tag.findByPk         | Renvoi une tag               |
| POST        | /tags      | Tagrouter      | tagController.create   | Tag.create           | Crée un nouveau tag          |
| DELETE      | /tags/:id  | Tagrouter      | tagController.remove   | Tag.delete           | Supprime un tag existant     |
| PATCH       | /tags/:id  | Tagrouter      | tagController.update   | Tag.update           | Modifie un tag existant      |

# Principaux Codes HTTP

Liste complète : https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP

| Code | Signification                        | Cas typique                              |
|------|--------------------------------------|------------------------------------------|
| `200`| OK                                   | Requête réussie (GET, PUT, PATCH)        |
| `201`| Created                              | Ressource créée (POST)                   |
| `204`| No Content                           | Suppression réussie (DELETE)             |
| `400`| Bad Request                          | Données manquantes ou invalides          |
| `401`| Unauthorized                         | Authentification requise                 |
| `403`| Forbidden                            | Accès refusé malgré l’authentification   |
| `404`| Not Found                            | Ressource introuvable                    |
| `409`| Conflict                             | Conflit lors de la création/modification |
| `500`| Internal Server Error                | Erreur serveur                           |