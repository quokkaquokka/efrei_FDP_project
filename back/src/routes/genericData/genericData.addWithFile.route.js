var convertFile = require('../../models/convertFile')

module.exports = {
  method: "POST",
  path: "/api/v1/generic/data/file",

  handler: async function (request, h) {
    const data = request.payload
    return convertFile.parseCsvFile(data.file, data.options)
  }
}