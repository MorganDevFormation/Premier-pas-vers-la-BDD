// import CoreController from './CoreController.js';
import { List, Card, Tag } from '../models/index.js';
import BaseController from './base.controller.js';

class TagController extends BaseController {

	constructor() {
		super(Tag, 'tag')
	}
}

const myController = new TagController();
export default myController;