const dmh = require('../../services/droneMessageHandler')


module.exports = {
  method: "GET",
  path: "/api/v1/intervention",

  handler: async function(request, h) {
    return Object.values(dmh.interventions)
  }
}