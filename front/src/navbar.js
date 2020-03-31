
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";

@inject(Router)
export class Navbar {

  constructor(router){
    this.router = router;

  }

  permission(routescope){
    const role = localStorage.getItem('uid')
    const admin = localStorage.getItem('admin')

    return routescope === 'neutre' 
      || (routescope === 'false' && !role) 
      || (routescope === 'true' && role)
      || (routescope === 'admin' && admin === 'true')
  }
}