
import io from 'socket.io-client';
import {EventAggregator} from 'aurelia-event-aggregator';
import {computedFrom, inject}  from "aurelia-framework";

@inject(EventAggregator)
export default class Socket {
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator

    console.log('Socket constructor')
    this.socket = io.connect('http://localhost:8000')

    this.socket.on('connect', function(message) {
      console.log('SIO: connect', message)
  })

    this.socket.on('welcome', function(message) {
        console.log('SIO: Welcome', message)
    })

    this.socket.on('msg', message => {
      console.log('SIO: msg', message)
      // do something (transform) with the message
      this.eventAggregator.publish('msg', message);
    })
  }

  send(message, data) {
    if (typeof data !== 'string') {
      data = JSON.stringify(data)
    }
    console.log('## send', message, data)
    this.socket.emit(message, data)
  }
}
