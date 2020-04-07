const mongodb = require('../services/mongodb.js')

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
  
  async function parseCsvFromUrl(url, options = {}) {
    return axios({
      method: 'get',
      url,
      responseType: 'stream'
    })
    .then(function (response) {
      const streamData = response.data
      return streamData
        .pipe(stripBom())
        .pipe(csv(options))
        .pipe(saveToDb())
    })
  }

main() {
let fileInputName = 'myInputFile.csv'; 
let fileOutputName = 'myOutputFile.json';
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
}