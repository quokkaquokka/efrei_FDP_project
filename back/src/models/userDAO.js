const mongodb = require('../services/mongodb.js')

var collectionName = 'Users';

const userDAO = module.exports = {
  async getUsers() {
    await mongodb.connect()
    const data = await mongodb.getData(collectionName)
    mongodb.disconnectDB();
    return data
  },
  async addUser(name = '', firstname = '', email = '', password = '') {
    const client = await mongodb.connect()
    const db = await mongodb.getDb()
    const collectionIdx = db.collection(collectionName);

    var data = {
      name: name,
      firstname: firstname,
      email: email,
      admin: "false",
      password: password
    };
    return new Promise((resolve, reject) => {
      collectionIdx.insertOne(data, (err, res) => {
        return err ? reject(err) : resolve(res)
      })
    })
    .then(res => {
      //console.log("Document inserted", res.ops);
      client.close();
      return res.ops;
    });
  },
  async getUserAuthentification(login, password) {
    await mongodb.connect()
    var db = await mongodb.getDb();
    let cursor = await db.collection(collectionName).find({
      email: login,
      password: password
    })
      .toArray();
    mongodb.disconnectDB();
    return cursor;
  },
  async updateUserRight(_id = '', name = '', firstname = '', email = '', password = ''){
    await mongodb.connect()
    var db = await mongodb.getDb();
    const res = await db.collection(collectionName).updateOne({ email }, { $set: { admin: "true" } },  { upsert: true })
    console.log(res);
  },
}
