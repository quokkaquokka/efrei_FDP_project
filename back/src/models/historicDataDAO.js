const mongodb = require('../services/mongodb.js')

var COLLECTION_NAME = 'historic-data';

const HistoricDataDAO = module.exports = {
  async getDatas(filters = undefined) {
    return await mongodb.fetch(COLLECTION_NAME, filters)
  }
}
