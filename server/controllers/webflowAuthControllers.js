import { dotenvFile } from "../helper/dotenv.js"
import axios from "axios";

dotenvFile;

const clientID = process.env.WEBFLOW_CLIENT_KEY;
const clientSecret = process.env.WEBFLOW_SECRET_KEY;
const redirectURI = process.env.WEBFLOW_REDIRECT_URI;

const webflowAuth = async (req, res) => {
    const redirectUrl = `https://webflow.com/oauth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}/callback`;
    res.redirect(redirectUrl);
};

const webflowAuthCallback = async (req, res) => {
    const code = req.query.code;

    // Exchange the code for an access token
    const response = await axios.post('https://api.webflow.com/oauth/token', {
        grant_type: 'authorization_code',
        client_id: clientID,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectURI,
    });

    const accessToken = response.data.access_token;

    res.send('Authorization successful! You can close this window.');
};


export { webflowAuth, webflowAuthCallback }