import {inject}  from "aurelia-framework";
import {Router}  from "aurelia-router";
import axios from 'axios';
import config from './config';


@inject(Router)
export class Upload {
	heading = 'add csv files to history';
	constructor(router) {
		this.router = router;
		this.isUploaded = false;
		this.urlLink = null;
		this.filePath = null;
		this.year = null;
		this.fileSepareteBy = null;
		this.separeteBy = null;
		this.selectedCategory = null;
		this.categories = [
			{ 
				id: 'historic-data',
				name: 'police NYC'
			},
			{ 
				id: 'user',
				name: 'profile'
			}
		]
	}
	async sendUrl() {
		const data = {
			link: this.urlLink,
			options: {
				collectionName: this.selectedCategory
			}
		}
		if(this.separeteBy) {
			data.options.csv = {
				separator: this.separeteBy
			}
		}
		const response = await axios.post(config.host + '/api/v1/generic/data/url', data);
		if(response.data === 'OK') {
			setTimeout(() => {
				this.isUploaded = true;
			}, 300);
		}
	}	
	
	async sendFile() {
		const data = {
			file: this.filePath,
			options: {
				collectionName: this.selectCategory
			}
		}
		if(this.fileSepareteBy) {
			data.options.csv = {
				separator: this.fileSepareteBy
			}
		}
		const response = await axios.post(config.host + '/api/v1/generic/data/file', data);
		if(response.data === 'OK') {
			setTimeout(() => {
				this.isUploaded = true;
			}, 300);
		}
	}
}
