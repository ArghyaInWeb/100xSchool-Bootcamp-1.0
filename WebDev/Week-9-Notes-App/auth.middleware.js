import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const getToken = req.headers.token;

  if (!getToken) {
    return res.status(403).json({
      message: "You are not logged in.",
    });
  }
  const verifyJWT = jwt.verify(getToken, "secret007");
  const username = verifyJWT.username;

  if (!username) {
    return res.status(403).json({
      message: "Malformed token",
    });
  }

  req.username = username;
  next();
}
