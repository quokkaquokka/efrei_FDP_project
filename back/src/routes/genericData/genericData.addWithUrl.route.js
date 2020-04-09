var convertFile = require('../../models/convertFile')

module.exports = {
  method: "POST",
  path: "/api/v1/generic/data/url",

  handler: async function (request, h) {
    const data = request.payload
    return convertFile.parseCsvFromUrl(data.link, data.options)
  }
}