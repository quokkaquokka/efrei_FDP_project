import {PLATFORM} from 'aurelia-pal';
import {inject}  from "aurelia-framework";
import {Router}  from "aurelia-router";
import config from './config';

@inject(Router)
export class Upload {
	heading = 'add csv files to history';
	constructor(router) {
        this.router = router;
		this.filePath = null;
		this.year = null;
    }
	
	sendMSG() { // "envoyer" button is pressed
		// DO SOMETHING HERE
	}
}
