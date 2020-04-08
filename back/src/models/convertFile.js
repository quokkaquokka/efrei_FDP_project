const axios = require('axios').default
const stripBom = require('strip-bom-stream')
const csv = require('csv-parser')
const fs = require('fs')
const mongodb = require('../services/mongodb')
const path = require('path')
const stream = require('stream')
const util = require('util')
const finished = util.promisify(stream.finished)

// const COLLECTION_DATA = 'historic-data'

const exp = module.exports =  {
  saveJSONtoDb: function(options) {
    if (!options.collectionName) {
      throw new Error('Collection name not provided.')
    }

    return new stream.Writable({
      objectMode: true,
      writev: async (chunks, cb) => {
        const data = chunks.map(c => c.chunk)
        // JSON modification must be here
        // data.map(j => { j.toto = true; return j})
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
    })
  }

}

async function main() {
  // https://support.staffbase.com/hc/en-us/article_attachments/360009197031/username.csv
  await mongodb.connect();
  await exp.parseCsvFromUrl('https://support.staffbase.com/hc/en-us/article_attachments/360009197031/username.csv', {collectionName: 'historic-data', csv: {separator: ';'}})
  // await exp.parseCsvFile('../../files_csv/test.csv', {collectionName: 'historic-data'})
  console.log('Done')
}

main()