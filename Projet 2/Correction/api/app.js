// Load environnment variables from .env
import 'dotenv/config';

// Import NPM modules
import express from 'express';

import { errorHandler } from './middlewares/common.middleware.js';

// Import local modules
import listRouter from './routes/list.router.js';
import cardRouter from './routes/card.router.js';
import tagRouter from './routes/tag.router.js';
import cardTagRouter from './routes/card_tag.router.js';

// Create Express app
const app = express();

// Indique à express qu'on utiliser du JSON dans le body des requetes et des reponses HTTP
app.use(express.json()); 

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
