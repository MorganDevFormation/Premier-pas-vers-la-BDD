# Du Mistral sur Dash

Pour rester à la mode, on intègre des fonctionnalités IA dans notre Kanban à l'aide d'un LLM cocorico : Mistral 🇫🇷 

Objectif : implémenter une route API dédiée servant d'interface pour communiquer avec Mistral. Côté front, il ne savent pas encore vraiment ce qu'ils vont en faire, mais un bruit de couloir dit que la première fonctionnalité serait de corriger les fautes d'orthographe dans les descriptions des cartes.

## Déroulement

1. Se renseigner sur comment utiliser l'[API de Mistral](https://docs.mistral.ai/api). En particulier, on jette un oeil à la route `/chat/completions`.

2. Récupérer une clé d'API via la [console Mistral](https://console.mistral.ai/api-keys). Choisir une date d'expiration proche (quelques jours) par mesure de sécurité.

3. Ajouter les informations au `.env` pour sécuriser notre clef d'API et paramétrer notre utilisation de Mistral.

```
MISTRAL_API_KEY=
MISTRAL_MODEL=mistral-small-latest
MISTRAL_BASE_URL=https://api.mistral.ai/v1
```

4. Implémenter une route `POST /prompt`, qui attend un body au format `{ "prompt": STRING }`. Cette route doit permettre de poser une question à Mistral et d'obtenir une réponse JSON au format `{ "text": STRING }`. Quelques conseils :
- comme indiqué plus haut, l'URL de base de l'API de Mistral est : `https://api.mistral.ai/v1`.
- penser à tester l'appel API de Mistral avant d'essayer de la coder en JavaScript, à l'aide d'un outil HTTP comme ThunderClient, Insomnia, Postman, ou RESTClient.
- on peut utiliser `fetch` dans du code Node.js pour faire ses requêtes HTTP : c'est comme dans le front !
- on regarde dans la documentation de Mistral comment authentifier sa requête avec sa clé API, et on n'oublie pas de la fournir dans le `fetch`.
- on peut utiliser de nombreux paramètres dans la requête `/chat/completions`... mais regardez surtout ceux qui sont obligatoires et ignorer les autres. Regarder avec attention l'exemple fourni par la documentation pour trouver le bon format du body de la requête.
- on pense également à bien logger la réponse de l'API pour vérifier ce que l'on récupère avant la manipuler.

<details><summary>
Rappel : faire un POST authentifié avec fetch
</summary>

```js
const httpResponse = await fetch(URL, {
  method: "POST",
  headers: {
    "Authorization": "Bearer API_KEY"
    "Content-Type": "application/json"
  },
  body: JSON.stringify(BODY)
});

const data = await httpResponse.json();
````

</details>


5. Tester la route (avec par exemple avec RESTClient) : 

```
### POST /prompt
POST {{baseUrl}}/prompt
Content-Type: application/json

{
  "prompt": "En une phrase, quelle est la couleur du ciel ?"
}
```

## Bonus

### Route dédiée n°1 : correction de l'orthographe

Créer une route dédiée permettant de traduire le texte fournie dans la requête :

- `POST /spellcheck` avec body `{ "text": STRING }`

Protéger cette route afin qu'elle ne soit accessible qu'aux administrateurs.

Utiliser cette route dans le client : par exemple, ajouter un bouton sur une carte permettant de corriger automatiquement les fautes d'orthographe de celle-ci !

### Route dédiée n°2 : traduction

Créer une route dédiée permettant de traduire le texte fourni dans la requête vers une langue précisée : 

- `POST /translate` avec body `{ "text": STRING, "lang": STRING }`

Protéger cette route afin qu'elle ne soit accessible qu'aux administrateurs.

Laisser libre cours à votre imagination pour l'interface utilisateur !

## Super Bonus

### Gestion des Tag

Pour le moment le client gère pas du tout l'affichae des Tag. Ajouter la gestion des Tag dans le front.

Commencer par l'affichage des tags pour chaque cartes. Une fois terminé, essayeez d'ajouter les ajouter des boutons pour ajouter, modifier et supprimer les tags. 

Attention, il manque peut-être une ou plusieurs routes dans l'API pour récupérer tous les Tag d'une Card. Si besoin, s'inspirer de ce qui a été fait pour récupérer toutes les Card d'une List.

Le drag and drop des Tag est un super super méga bonus ;) 

### Gestion des droit d'accès  

Développer un système de gestion des droits d'accès plus robuste en enregistrant en BBD la liste de toutes les actions possibles, et la liste de toutes les permission. 

Rappel: une permission est l'association d'une action et d'un rôle ==> un role peut exécuter telle action.

Vous devrez modifier le middleware isAllowed pour implémenter cette fonctionnalité.
