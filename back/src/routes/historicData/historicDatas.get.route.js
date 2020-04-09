var historicDataDAOModel= require('../../models/historicDataDAO')

module.exports = {
  method: "GET",
  path: "/api/v1/historicdatas",

  handler: async function(request, h) {
    return historicDataDAOModel.getDatas();
  }
}