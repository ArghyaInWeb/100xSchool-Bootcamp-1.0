import jwt from "jsonwebtoken";

const JWT_SECRET = "trelloSecret"

export function authenticate(req, res, next) {
  const getToken = req.headers.token;

  if (!getToken) {
    return res.status(403).json({
      message: "You are not logged in.",
    });
  }
  const verifyJWT = jwt.verify(getToken, JWT_SECRET);
  const userId = verifyJWT.userId;

  if (!userId) {
    return res.status(403).json({
      message: "Malformed token",
    });
  }

  req.userId = userId;
  next();
}
