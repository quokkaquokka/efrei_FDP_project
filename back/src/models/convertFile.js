const mongodb = require('../services/mongodb.js')
const axios = require('axios').default
const stripBom = require('strip-bom-stream')
const stream = require('stream')
const csv = require('csv-parser')
const fs = require('fs')

const exp = module.exports =  {
  saveJSONtoDb: async function() {
    const mongoClient = new mongodb.MongoClient(config.mongodb.uri, {
      poolSize: 10,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    await mongoClient.connect()
    const db = mongoClient.db(config.mongodb.dbname)
    
    const historicData = db.collection('historic-data')
    
    const saveToDb = new stream.Writable({
      objectMode: true,
      writev: async (chunks, cb) => {
        await historicData.insertMany(chunks.map(c => c.chunk))
        cb()
      },
    })
  },
  parseCsvFromUrl: async function (url, options = {}) {
    const saveToDb = new stream.Writable({
      objectMode: true,
      writev: async (chunks, cb) => {
        console.log('## ', chunks.map(c => c.chunk))
        // await historicData.insertMany(chunks.map(c => c.chunk))
        cb()
      },
    })

    fs.createReadStream('./files_csv/test.csv')
        .pipe(stripBom())
        .pipe(csv(options))
        .pipe(saveToDb)

    /*
    return axios({
      method: 'get',
      url,
      responseType: 'stream'
    })
    .then(function (response) {
      const streamData = response.data

      return streamData
        // .pipe(stripBom())
        .pipe(csv({separator: ';'}))
        .pipe(saveToDb)
    })*/
  }

}

async function main() {
  // https://support.staffbase.com/hc/en-us/article_attachments/360009197031/username.csv
  await exp.parseCsvFromUrl('')
}

main()