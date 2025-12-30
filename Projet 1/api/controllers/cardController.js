import { Card } from '../models/index.js';
import BaseController from './baseController.js';

class CardController extends BaseController {

    constructor() {

        super(Card, 'cards')
    }
}

const myController = new CardController();

export default myController