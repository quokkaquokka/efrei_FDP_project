const uuid = require('uuid')
const _ = require('lodash')

/*
  msg:
  - 1 image
  - a standard message (drone location, time, drone id) with additional field : a violation code describing the nature of the offense, image id
*/

const _TIME_INTERVAL_ = [1000, 10000] //ms
const _HELP_NEED_ = ['Can\'t read plate', 'Can\'t determine if violation or not', 'Another error that need operator intervention', 'Another error that need operator intervention', 'Another error that need operator intervention', 'Another error that need operator intervention']
const _OP_INTERVENTION_CODE_ = 0
const _OP_INTERVENTION_PERCENT_ = 50 // %
const _VIOLATION_CODES_ = [2, 3, 4]
const _DRONE_IDS_ = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6']
const _COORDINATES_ = ['48.811909, 2.361926', '48.814226, 2.361196', '48.813449, 2.357763', '48.812297, 2.354362', '48.815236, 2.358653', '48.811283, 2.360188', '48.809863, 2.359866', '48.812802, 2.361023', '48.813251, 2.359360', '48.809382, 2.364349', '48.808428, 2.359907', '48.808450, 2.352085', '48.807969, 2.348395']
const _IMAGES_ = ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg']

const isOpInterventionCode = () => {
  const rand = Math.floor(Math.random() * 100)
  return rand <= _OP_INTERVENTION_PERCENT_
}

const getRandomValue = (tab) => {
  const idx = Math.floor(Math.random() * tab.length)
  return tab[idx]
}

const generateViolation = () => {
  const droneId = getRandomValue(_DRONE_IDS_)
  const ts = Date.now()
  const coordinates = getRandomValue(_COORDINATES_)
  const isInterventionCode = isOpInterventionCode()
  const code = isInterventionCode ? _OP_INTERVENTION_CODE_ : getRandomValue(_VIOLATION_CODES_)
  const image = isInterventionCode ? undefined : getRandomValue(_IMAGES_)
  const imageId = uuid.v4()

  if (isInterventionCode) {
    console.log('Intervention message')
    return [{
      droneId,
      ts,
      coordinates,
      code,
      reason: getRandomValue(_HELP_NEED_)
    }]
  }

  return [{
    image,
    imageId,
  }, {
    droneId,
    ts,
    coordinates,
    code,
    imageId,
  }]
}

const violationGenerator = (violationHandler) => {
  // console.log('Violation generator')
  const [min, max] = _TIME_INTERVAL_
  const intervalDuration = max - min
  const nextTick = Math.floor(Math.random() * intervalDuration) + min
  // console.log('Next Tick: ',  Math.floor(Math.random() * intervalDuration))
  const violation = generateViolation()
  violation.forEach(m => violationHandler(m))

  // console.log('Violation generator - next call in', nextTick)
  setTimeout(_.partial(violationGenerator, violationHandler), nextTick)
}

module.exports = {
  generateViolation,
  violationGeneratorJob: violationGenerator,
}