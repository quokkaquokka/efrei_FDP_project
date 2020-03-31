import axios from "axios";
import {BindingSignaler} from 'aurelia-templating-resources';
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import config from './config'

@inject(Router, BindingSignaler)
export class Login {

  constructor(router, signaler) {
    this.router = router;
    this.signaler = signaler;
    this.email = null;
    this.password = null;
    this.user = null;
    this.error = null;
  }

  async login() {
    var data = {
      login : this.email,
      password : this.password
    };

    if(this.email === null || this.password === null) {
      this.error = 'Invalid mail or/and password';
      return;
    }
    const response = await axios.post('//'+ config.host + '/api/v1/users/authentification/', data);
    this.user = response.data[0];
    if(response.data.length === 0){
      this.error = 'Invalid mail or/and password';
      return;
    }

    localStorage.setItem("email", this.user.email);
    localStorage.setItem("uid", this.user._id);
    localStorage.setItem("name", this.user.name + ' ' + this.user.firstname);
    localStorage.setItem("admin", this.user.admin);

      
    this.signaler.signal('my-signal')
    this.router.navigate('simulation');

  }

}
