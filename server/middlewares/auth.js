import { dotenvFile } from "../helper/dotenv.js"
import JWT from "jsonwebtoken";
dotenvFile;

const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    const { status, data } = error.response || {};
    return res.status(status || 500).json({ message: 'Error in login.', success: false, data: data });
  }
};

export { requireSignIn }