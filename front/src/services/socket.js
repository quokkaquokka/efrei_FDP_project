
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



    this.socket.on('newIntervention', message => {
      console.log('SIO: newIntervention', message)
      if (typeof message === 'string') message = JSON.parse(message)
      // do something (transform) with the message
      this.eventAggregator.publish('newIntervention', message);
    })
    this.socket.on('disableIntervention', message => {
      console.log('SIO: disableIntervention', message)
      if (typeof message === 'string') message = JSON.parse(message)
      // do something (transform) with the message
      this.eventAggregator.publish('disableIntervention', message);
    })
    this.socket.on('newViolation', message => {
      console.log('SIO: newViolation', message)
      if (typeof message === 'string') message = JSON.parse(message)
      // do something (transform) with the message
      this.eventAggregator.publish('newViolation', message);
    })
    this.socket.on('take-intervention-refused', message => {
      console.log('SIO: take-intervention-refused', message)
      if (typeof message === 'string') message = JSON.parse(message)
      // do something (transform) with the message
      this.eventAggregator.publish('take-intervention-refused', message);
    })

    this.socket.on('take-intervention-accepted', message => {
      console.log('SIO: take-intervention-accepted', message)
      if (typeof message === 'string') message = JSON.parse(message)
      // do something (transform) with the message
      this.eventAggregator.publish('take-intervention-accepted', message);
    })

    this.socket.on('remove-intervention', message => {
      console.log('SIO: remove-intervention', message)
      if (typeof message === 'string') message = JSON.parse(message)
      // do something (transform) with the message
      this.eventAggregator.publish('remove-intervention', message);
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
