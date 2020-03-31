var userTestDAOModel= require('../../models/userDAO')

module.exports = {
  method: "GET",
  path: "/api/v1/users",

  handler: async function(request, h) {
    return userTestDAOModel.getUsers();
  }
}