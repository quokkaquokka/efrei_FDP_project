import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import {BindingSignaler} from 'aurelia-templating-resources';

@inject(Router, BindingSignaler)
export class Navuser {
  constructor(router, signaler){
    this.router = router;
    this.signaler = signaler;
  }

  logout(){
    localStorage.clear();
    this.router.navigate('welcome');
    this.signaler.signal('my-signal');

  }

  isLogged()
  {
    console.log(localStorage.getItem('uid'))
    return localStorage.getItem('uid') !== null
  }
}