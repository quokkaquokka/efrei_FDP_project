var historicDataDAOModel= require('../../models/historicDataDAO')

module.exports = {
  method: "POST",
  path: "/api/v1/searchdatas",

  handler: async function(request, h) {
    const data = request.payload
    return historicDataDAOModel.getSearchDatas(data);
  }
}