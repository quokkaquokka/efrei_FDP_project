import {PLATFORM} from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    config.title = 'Terrapretta';
    config.map([
      {
        route: ['', 'welcome'],
        name: 'welcome',
        moduleId: PLATFORM.moduleName('./welcome'),
        nav: true,
        title: 'Welcome',
        settings: {
          img: 'fas fa-home',
          data: 'neutre'

        }
      },
      {
        route: ['login'],
        name: 'Login',
        moduleId: PLATFORM.moduleName('./login'),
        nav: true,
        title: 'Login',
        settings:{
          img: 'fas fa-sign-in-alt',
          data: 'false'
        }
      },
      {
        route: ['signin'],
        name: 'signin',
        moduleId: PLATFORM.moduleName('./signin'),
        nav: true,
        title: 'signin',
        settings:{
          img: 'fas fa-user-plus',
          data: 'false'
        }
      },
	  {
		  route: ['upload'],
		  name: 'upload',
		  moduleId: PLATFORM.moduleName('./upload'),
		  nav: true,
		  title: 'upload' //may need settings or nav: false
	  }
    ]);

    this.router = router;
  }
}
