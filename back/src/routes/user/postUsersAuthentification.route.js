var userTestDAOModel= require('../../models/userDAO')

module.exports = {
  method: "POST",
  path: "/api/v1/users/authentification/",

  handler: async function(request, h) {
    let {
        login,
        password
      } = request.payload;
    return userTestDAOModel.getUserAuthentification(login, password);
  }
}