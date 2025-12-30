// ======== IMPORT ========== //

import express from 'express';
import 'dotenv/config';
/*import { join } from 'node:path';*/

import { router } from './routers/listRouter.js';
import { CardRouter } from './routers/cardRouter.js';
import { TagRouter } from './routers/tagRouter.js';
import { cardTagRouter } from './routers/cardTagRouter.js';

import { errorHandler } from './middlewares/common.middleware.js';



// ========= BRANCHEMENT EXPRESS ========== //

const app = express();
app.use(express.json());      // on utilise JSON dans le body des requêtes / réponses http

/* ========= BRANCHEMENT EJS ========== //

app.set('views', join(import.meta.dirname, 'app/views'))
app.set('view engine', 'ejs')

// ========== BRANCHEMENT FICHIER STATICS ========= //

app.use(express.static(join(import.meta.dirname, 'public'))) */


// ========== ROUTES API ========== //

app.use(router);
app.use(CardRouter);
app.use(TagRouter);
app.use(cardTagRouter);

// =========== MIDDLEWARE DE GESTION D'ERREURS =========== //

app.use(errorHandler);


// ======= DEMARRAGE SERVEUR ========= //

const port = process.env.PORT || 3000;
//const base_url = process.env.BASE_URL || 'http://localhost';

app.listen(port, () => {
    console.log(`🚀 API ok on http://localhost:${port}`)
})