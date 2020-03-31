const { executeScalaScript } = require('../models/excuteScala')
 
module.exports = {
  method: "GET",
  path: "/api/v1/exec",

  handler: async function(request, h) {
    return executeScalaScript();
  }
}