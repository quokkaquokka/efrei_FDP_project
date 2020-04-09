const axios = require('axios').default
const stripBom = require('strip-bom-stream')
const csv = require('csv-parser')
const fs = require('fs')
const mongodb = require('../services/mongodb')
const path = require('path')
const stream = require('stream')
const util = require('util')
const finished = util.promisify(stream.finished)
const _ = require('lodash')

/*
  Translate CSV to JSON from pathFile or url link
*/

const exp = module.exports =  {
  saveJSONtoDb: function(options) {
    if (!options.collectionName) {
      throw new Error('Collection name not provided.')
    }

    return new stream.Writable({
      objectMode: true,
      autoDestroy: true,
      writev: async (chunks, cb) => {
        let data = chunks.map(({chunk}) => {
          const res = {}
          for (let [key, value] of Object.entries(chunk)) {
            const attr = _.camelCase(key)
            res[attr] = value
          }
          return res
        })
        await mongodb.insert(options.collectionName, data)
        cb()
      },
    })
  },

  handleStream: async function(inputStream, options) {
    stream.pipeline(inputStream, 
      stripBom(), 
      csv(options.csv),
      this.saveJSONtoDb(options),
      async (error, val) => {
        if (error) {
          console.log('Error occured', error)
        }
        await mongodb.close()
      }  
    )
  },
  parseCsvFile: async function (CsvFile, options = { csv: {/* separator: ';' */}, /* collectionName */}) {
    const filePath = path.join(__dirname, CsvFile)
    const pipeline = fs.createReadStream(filePath)
    this.handleStream(pipeline, options)
    return 'OK'
  },
  parseCsvFromUrl: async function (url, options = {csv: {}}) {
    return axios({
      method: 'get',
      url,
      responseType: 'stream'
    })
    .then(async response => {
      const streamData = response.data
      this.handleStream(streamData, options)
      return 'OK'
    })
  }

}
