const mongodb = require('../services/mongodb.js')
const execScala = require('../scala/excuteScala')
const fs = require('fs')
const _ = require('lodash')
 
var COLLECTION_NAME = 'historic-data';

const HistoricDataDAO = module.exports = {
  async getDatas(filters = undefined) {
    return await mongodb.fetch(COLLECTION_NAME, filters)
  },
  async getSearchDatas(data) {
    const convertData = _.extend({}, ...data)
    
    const historicData = await this.getDatas(convertData)
    let donnees = JSON.stringify(historicData)
    fs.writeFileSync('inputScala.json', donnees)
    await execScala.executeScalaScript()
    return historicData
  }
}