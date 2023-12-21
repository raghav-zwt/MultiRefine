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
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export { requireSignIn }