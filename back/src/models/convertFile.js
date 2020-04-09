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

// const COLLECTION_DATA = 'historic-data'

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
        // // JSON modification must be here
        // data = data.map(j => { 
        //   const n = {}
        //   const keys = Object.keys(data).forEach(k => {
        //     const attr = _.camelCase(k)
        //     console.log('new key', attr)
        //     n[attr] = data[k]
        //   })
        // })
        // console.log('DATA transformed: ', data)
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
        console.log('Done', val)
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
/*

async function main() {
  // https://support.staffbase.com/hc/en-us/article_attachments/360009197031/username.csv
  await mongodb.connect();
  await exp.parseCsvFromUrl('https://support.staffbase.com/hc/en-us/article_attachments/360009197031/username.csv', {collectionName: 'user', csv: {separator: ';'}})
  await exp.parseCsvFile('../../files_csv/test.csv', {collectionName: 'historic-data'})
  console.log('Done')
}

main()

*/