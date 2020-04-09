import {PLATFORM} from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    config.title = 'PrestaCop';
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
        route: ['upload'],
        name: 'upload',
        moduleId: PLATFORM.moduleName('./upload'),
        nav: true,
        title: 'upload',
        settings: {
          img: 'fas fa-upload',
          data: 'false'
        }
      },
      {
        route: ['view'],
        name: 'view',
        moduleId: PLATFORM.moduleName('./view'),
        nav: true,
        title: 'view',
        settings: {
          img: 'fas fa-eye',
          data: 'false'
        }
      },
      {
        route: ['login'],
        name: 'Login',
        moduleId: PLATFORM.moduleName('./login'),
        nav: true,
        title: 'Login',
        settings: {
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
        settings: {
          img: 'fas fa-user-plus',
          data: 'false'
        }
      }
    ]);
    this.router = router;
  }
}
