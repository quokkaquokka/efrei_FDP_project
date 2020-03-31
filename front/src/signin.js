import config from './config'
import axios from "axios";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";

@inject(Router)
export class Signin{
  constructor(router) {
    this.router = router;
    this.error = null;
    this.name = null;
    this.firstname = null;
    this.email = null;
    this.password = null;
    this.confirmPassword = null;
  }

  async submit() {
    var data = {
      name: this.name,
      firstname: this.firstname,
      email : this.email,
      password : this.password
    };

    if(this.email === null || this.password === null || this.confirmPassword === null) {
      this.error = 'Tous les champs sont obligatoire!';
      return;
    }
    if(this.password !== this.confirmPassword) {
      this.error = 'Vos mots de passes ne sont pas identiques';
      return;
    }
    const response = await axios.post('//'+ config.host + '/api/v1/users', data);
    if(response.data.lenght === 0){
      this.error = 'Une erreur est surevenu, Veuillez réessayer plutard';
      return;
    }
    this.router.navigate('login');
    
  }


  async test(){
    var data = {
      id : '5df54214f373c85ba461953d',
      name: 'test',
      firstname: 'test',
      email: 'test@test.fr',
      password: 'test'

    }
    const response = await axios.put('//'+ config.host + '/api/v1/users/id', data);
    console.log(response)

  }
  
}
