import { dotenvFile } from "../helper/dotenv.js"
import JWT from "jsonwebtoken";
dotenvFile;

const accessTokenVerifier = (req, res, next) => {
    try {
        const tokenHeader = req.headers['webflow-access-token']
        if (!tokenHeader) throw new Error('No Access Token Provided');
        next()
    } catch (error) {
        console.log(error);
        if (error) {
            throw new error
        }
    }
}

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

const isAuthenticated = (req, res, next) => {
    if (req) {
      return next(); 
    } else {
      return res.status(401).json({ message: 'Unauthorized' }); 
    }
  };

export { accessTokenVerifier }