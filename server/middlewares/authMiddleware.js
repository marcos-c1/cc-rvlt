const jwt = require("jsonwebtoken");

class AuthMiddleware {
  static verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      res.status(401).json(`Acesso negado.`);
    }
    try {
      const decodedJwt = jwt.verify(token, process.env.JWT_SECRET);
      const { idUser, isAdmin, email, idPayment } = decodedJwt;
      req.idUser = idUser;
      req.isAdmin = isAdmin;
      req.email = email;
      req.idPayment = idPayment;

      next();
    } catch (e) {
      res.status(401).json(`Token invalido: ${e}`);
    }
  };
}

module.exports = AuthMiddleware;
