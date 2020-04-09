const dmh = require('../../services/droneMessageHandler')


module.exports = {
  method: "GET",
  path: "/api/v1/violation",

  handler: async function(request, h) {
    return dmh.violations
  }
}