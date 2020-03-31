var userTestDAOModel= require('../../models/userDAO')

module.exports = {
  method: "PUT",
  path: "/api/v1/users/id",

  handler: async function(request, h) {
    let { id, name, firstname, email, password } = request.payload;
    return userTestDAOModel.updateUserRight(id, name, firstname, email, password);
  }
}