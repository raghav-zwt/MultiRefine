import { dotenvFile } from "../helper/dotenv.js"
import axios from "axios";

dotenvFile;

const clientID = process.env.WEBFLOW_CLIENT_KEY;
const clientSecret = process.env.WEBFLOW_SECRET_KEY;
const redirectURI = process.env.WEBFLOW_REDIRECT_URI;

const webflowAuth = async (req, res) => {
    const authURL = `https://api.webflow.com/oauth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}`;
    res.redirect(authURL);
};

const webflowAuthCallback = async (req, res) => {
    const code = req.query.code;
    const tokenURL = 'https://api.webflow.com/oauth/access_token';

    try {
        const response = await axios.post(tokenURL, {
            code,
            client_id: clientID,
            client_secret: clientSecret,
            redirect_uri: redirectURI,
            grant_type: 'authorization_code',
        });

        const accessToken = response.data.access_token;

        res.send('Authorization successful!', accessToken);
    } catch (error) {
        res.status(500).send('Error during authorization.');
    }
};


export { webflowAuth, webflowAuthCallback }