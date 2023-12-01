const { handleServerError, handleClientError } = require('../helper/handleError');
const { verifyToken } = require('../helper/jwt');

const authentication = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return handleClientError(res, 401, 'Authentication failed, you need token');
    }
    const token = bearerToken.replace('Bearer ', '');

    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      return handleClientError(res, 400, 'Token is invalid')
    }
    req.user = decodedToken;

    next();
  } catch (error) {
    console.log(error)
    handleServerError(res)
  }
};

module.exports = authentication;
