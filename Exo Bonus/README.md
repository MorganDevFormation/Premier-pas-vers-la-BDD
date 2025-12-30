
## Contexte

Vous êtes chargé de développer une interface web simple pour la plateforme T'chat, un forum d'experts multidisciplinaires.  
L'accès à certaines ressources (profils, posts, commentaires...) est protégé : il faut s'authentifier pour obtenir un token JWT, puis utiliser ce token pour accéder aux routes sécurisées de l'API.

## Consignes

1. **Utilisez l'API Oddit déjà développée**  
   (cf. dossier `backend/` pour la documentation des routes et le lancement du serveur).

2. **Réalisez une interface web simple permettant à un utilisateur de :**
   - S'authentifier via un formulaire de connexion (email + mot de passe).
   - Récupérer et stocker le token JWT renvoyé par l'API (dans le localStorage ou sessionStorage).
   - Utiliser ce token pour effectuer un appel authentifié à une route protégée de l'API (ex : récupération du profil utilisateur, liste des posts, création d'un post...).
   - Afficher les données récupérées dans la page.

> Vous pouvez soit réaliser vous même l'interface à l'aide de l'intégration fourni si vous souhaitez vous entrainer sur la partie purement frontend ouj partir de l'interface en Svelte fournie dans le dossier frontend

3. **Bonus :**
   - Permettre à l'utilisateur de se déconnecter (suppression du token).
   - Afficher un message d'erreur en cas d'échec de l'authentification.
   - Permettre la création d'un post ou d'un commentaire si l'utilisateur est authentifié.




