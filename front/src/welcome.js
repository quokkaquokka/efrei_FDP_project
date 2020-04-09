import { inject } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import Socket from './services/socket';
import axios from "axios";
import config from './config'
// import {Router}  from "aurelia-router";
// import {PLATFORM} from 'aurelia-pal';
// import config from './config';

// @inject(Router)

@inject(Socket, EventAggregator)
export class Welcome {
  interventions = []
  violations = []
  itemTaken = undefined

  constructor(socket, eventAggregator) {
    this.socket = socket;
    this.eventAggregator = eventAggregator;
  }

  async activate() {
    this.interventions = await axios.get(config.host + '/api/v1/intervention').then(response => response.data.slice(0,9));
    this.violations = await axios.get(config.host + '/api/v1/violation').then(response => response.data.slice(0,9));

    this.eventAggregator.subscribe('msg', payload => {
      console.log('EA: msg received', payload);
      this.pongReception = true;
      setTimeout(() => { this.pongReception = false }, 5000);
    });

    this.eventAggregator.subscribe('newIntervention', payload => {
      console.log('newIntervention', payload)
      this.interventions.push(payload)
    });

    this.eventAggregator.subscribe('newViolation', payload => {
      console.log('--  newViolation', typeof payload, payload)
      this.violations.push(payload)
      if (this.violations.length > 10) {
        this.violations.shift()
      }
    });

    this.eventAggregator.subscribe('take-intervention-refused', payload => {
      console.log('--  refused drone controle', typeof payload, payload)
      this.itemTaken = undefined
    });

    this.eventAggregator.subscribe('take-intervention-accepted', payload => {
      console.log('--  accepted drone controle', typeof payload, payload)
      this.droneControl = true
    });
  }

  actionButton() {
    this.socket.send('another-event', {username: 'camille'});
  }

  takeIntervention(intervention) {
    console.log('interv', intervention.uuid, intervention)
    this.itemTaken = intervention.uuid
    this.socket.send('take-intervention', {uuid: intervention.uuid});
  }

  returnIntervention(intervention) {
    console.log('return interv', intervention.uuid, intervention)
    this.itemTaken = undefined
    this.droneControl = undefined
    this.socket.send('return-intervention', {uuid: intervention.uuid});
  }

  closeIntervention(intervention) {
    this.itemTaken = undefined
    this.droneControl = undefined
    this.socket.send('close-intervention', {uuid: intervention.uuid});

    // fixMe: Must wait server response
    const idx = this.interventions.findIndex(i => i.uuid === intervention.uuid)
    this.interventions.splice(idx, 1)
  }
}
