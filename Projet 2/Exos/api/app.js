// Load environnment variables from .env
import 'dotenv/config';

// Import NPM modules
import express from 'express';

import { errorHandler } from './middlewares/common.middleware.js';

// Import le middlewre qui vérifie les tokens
import { validateToken } from './middlewares/auth.middleware.js';

// Import local modules
import listRouter from './routes/list.router.js';
import cardRouter from './routes/card.router.js';
import tagRouter from './routes/tag.router.js';
import cardTagRouter from './routes/card_tag.router.js';
import authRouter from './routes/auth.router.js';

// import CORS
import cors from 'cors';
// import contre les failles XSS
import { xss } from 'express-xss-sanitizer';


// Create Express app
const app = express();

// middleware CORS

app.use(cors());
// accepte de partager les données avec le navigateur sur l'URL localhost:5173
app.use(cors({origin: "http://localhost:5173"}));

// Indique à express qu'on utiliser du JSON dans le body des requetes et des reponses HTTP
app.use(express.json()); 

// Protection contre les failles XSS
app.use(xss());

// Router inscription + authentification
app.use(authRouter);

// Ajoute le validateToken
// Toutes les routes qui sont ajoutée après cette instruction sont protégée par un token
// cad, les clients doivent être connecté pour accéder aux routes déclarées après
app.use(validateToken);

// Plug routes on app
app.use(listRouter);
app.use(cardRouter);
app.use(tagRouter);
app.use(cardTagRouter);



// Express: utilise le middle qui va gérer les erreurs
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API started at http://localhost:${PORT}`);
});
