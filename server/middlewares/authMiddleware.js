const jwt = require("jsonwebtoken");

class AuthMiddleware {
  static async verifyToken(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json(`Acesso negado.`);
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
      return res.status(401).json(`Token invalido: ${e}`);
    }
  }
}

module.exports = AuthMiddleware;
