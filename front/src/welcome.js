import { inject } from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import Socket from './services/socket';
// import {Router}  from "aurelia-router";
// import {PLATFORM} from 'aurelia-pal';
// import config from './config';

// @inject(Router)

@inject(Socket, EventAggregator)
export class Welcome {
  constructor(socket, eventAggregator) {
    this.socket = socket;
    this.eventAggregator = eventAggregator;
    console.log('EA', eventAggregator);
  }

  activate() {
    console.log('LA', this.EventAggregator);
    this.eventAggregator.subscribe('msg', payload => {
      console.log('EA: msg received', payload);
      this.pongReception = true;
      setTimeout(() => { this.pongReception = false }, 5000);
    });
  }

  actionButton() {
    this.socket.send('another-event', {username: 'camille'});
  }
}
