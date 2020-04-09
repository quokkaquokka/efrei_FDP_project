const uuid = require('uuid')

const interventions = {}
const violationQueue = []
const violations = []

const handleDroneMessage = (message) => {
  const socketManager = require('./socket')

  message.uuid = uuid.v4()

  // Intervention message
  if (message.code !== undefined && message.code === 0) {

    interventions[message.uuid] = message
    // TODO: Do somethhing with msg
    socketManager.getSocket().emit('newIntervention', JSON.stringify(message))
    // console.log('intervention pushed in queue. Notification sent.')
    return
  }

  // Violation data message
  if (message.code) {
    violationQueue.push(message)
    // console.log('Violation pushed in queue.')
    return
  }

  // Violation image
  if (message.image) {
    // console.log('Image', message.image)
    // TODO: do something with image
    return
  }

  console.log('Unkown message', message)
}

const violationQueueHandler = async () => {
  const socketManager = require('./socket')

  if (violationQueue.length === 0) {
    // console.log('ViolationQueueHandler - No message')
    return setTimeout(violationQueueHandler, 1000)
  }

  const msg = violationQueue.shift()


  // console.log('ViolationQueueHandler - msg: ', msg)
  // TODO: Transform message to PrestaCop JSON format
  // TODO: geocode reverse location
  // TODO: fetch car information from plate
  // TODO: save in db
  const violation = msg
  violations.push(violation)
  socketManager.getSocket().emit('newViolation', JSON.stringify(violation))


  if (violationQueue.length > 0) {
    // console.log('ViolationQueueHandler - handle next msg')
    return setTimeout(violationQueueHandler())
  }
  // console.log('ViolationQueueHandler - No new message')
  return setTimeout(violationQueueHandler, 1000)
}

const takeIntervention = (uuid) => {
  console.log('interventions', uuid, interventions)
  if (interventions[uuid] && !interventions[uuid].taken) {
    interventions[uuid].taken = true
    return true
  }

  return false
}

const closeIntervention = (uuid) => {
  delete interventions[uuid]
  console.log('DMH.CloseIntervention - interventions.length', interventions.length)
}

const returnIntervention = (uuid) => {
  console.log('interventions', uuid, interventions)
  if (interventions[uuid]) {
    interventions[uuid].taken = false
  }
  return true
}

module.exports = {
  handleDroneMessage,
  violationQueueHandlerJob: violationQueueHandler,
  closeIntervention,
  takeIntervention,
  interventions,
  violations,
  returnIntervention,
}