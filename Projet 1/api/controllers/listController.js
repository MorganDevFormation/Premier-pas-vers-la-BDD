import { List } from '../models/index.js';
import BaseController from './baseController.js';

class ListController extends BaseController {

    constructor() {

        super(List, 'list')
    }

}

const myController = new ListController();

export default myController