import { dotenvFile } from "../helper/dotenv.js"
import axios from "axios";

dotenvFile;

const auth = async (req, res) => {
    const authorizeURL = `https://webflow.com/oauth/authorize?response_type=code&client_id=${clientKey}&redirect_uri=${redirectURI}`;
    res.redirect(authorizeURL);
};

const authCallback = async (req, res) => {
    const code = req.query.code;

    try {
        const tokenResponse = await axios.post('https://api.webflow.com/oauth/access_token', {
            code,
            client_id: process.env.WEBFLOW_CLIENT_KEY,
            client_secret: process.env.WEBFLOW_SECRET_KEY,
            redirect_uri: process.env.WEBFLOW_REDIRECT_URI,
            grant_type: 'authorization_code',
        });

        const accessToken = tokenResponse.data.access_token;

        req.session.accessToken = accessToken;

        res.send('Authorization successful!');
    } catch (error) {
        console.error('Error exchanging code for access token:', error.message);
        res.status(500).send('Error exchanging code for access token');
    }
};


export { auth, authCallback }