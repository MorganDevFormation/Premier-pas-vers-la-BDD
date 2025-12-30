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

|  Verbe HTTP | Url        | Nom du routeur  | Contrôleur & méthode   | Model & méthodes     | Description                   |
|-------------|------------|-----------------|------------------------|----------------------|-------------------------------|
| GET         | /lists     | list.router     | listController.getAll  | List.findAll         | Renvoi toutes les listes      |
| GET         | /lists/:id | list.router     | listController.getById | List.findByPk        | Renvoi une liste              |
| POST        | /lists     | list.router     | listController.create  | List.create          | Crée une nouvelle liste       |
| DELETE      | /lists/:id | list.router     | listController.remove  | List.delete          | Supprime une liste existante  |
| PATCH       | /lists/:id | list.router     | listController.update  | List.update          | Modifie une liste existante   |
|-------------|------------|-----------------|------------------------|----------------------|-------------------------------|
| GET         | /cards     | cards.router    | cardController.getAll  | Card.findAll         | Renvoi toutes les Cartes      |
| GET         | /cards/:id | cards.router    | cardController.getById | Card.findByPk        | Renvoi une cartes             |
| POST        | /cards     | cards.router    | cardController.create  | Card.create          | Crée une nouvelle carte       |
| PATCH       | /cards/:id | cards.router    | cardController.update  | Card.update          | Modifie une cartes existante  |
| DELETE      | /cards/:id | cards.router    | cardController.remove  | Card.delete          | Supprime une carte existante  |
|-------------|------------|-----------------|------------------------|----------------------|-------------------------------|

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