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
    // recupere the data
    /* const nd2 = {}
    const convertData = data.forEach(element => {
      console.log('ee', Object.keys(element)[0])
      const key = Object.keys(element)[0]
      nd2[key] = element[key]
    });
    console.log('nd', convertData) 
    */ 
    const convertData = _.extend({}, ...data)
    
    const historicData = await this.getDatas(convertData)
    let donnees = JSON.stringify(historicData)
    fs.writeFileSync('inputScala.json', donnees)
    // TODO: traitement par le scala
    // const result = await execScala.executeScalaScript()
    await execScala.executeScalaScript()
    // lit le fichier scala le input qu'il a rendu
    return historicData
  }
}