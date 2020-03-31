var userDAOModel = require('../../models/userDAO')


module.exports = {
  method: "POST",
  path: "/api/v1/users",

  handler: async function (request, h) {
    const {
      name, firstname, email, password
    } = typeof request.payload === 'string' ? JSON.stringify(request.payload) : request.payload;
    return userDAOModel.addUser(name, firstname, email, password);
  }
}