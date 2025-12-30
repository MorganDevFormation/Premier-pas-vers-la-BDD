import { Tag } from '../models/index.js';
import BaseController from './baseController.js';

class tagController extends BaseController {

    constructor() {

        super(Tag, 'tags')
    }
}

const myController = new tagController();

export default myController