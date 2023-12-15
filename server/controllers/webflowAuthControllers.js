import { dotenvFile } from "../helper/dotenv.js"
import axios from "axios";

dotenvFile;

const clientID = process.env.WEBFLOW_CLIENT_KEY;
const clientSecret = process.env.WEBFLOW_SECRET_KEY;
const redirectURI = process.env.WEBFLOW_REDIRECT_URI;

const webflowAuth = async (req, res) => {
    const authUrl = `https://webflow.com/oauth/authorize?response_type=code&client_id=${clientID}`;
    res.redirect(authUrl);
};

const webflowAuthorized = async (req, res) => {
    try {
        const { code, client_id, client_secret, redirect_uri, grant_type } = req.body;
        const encodedRedirectUri = redirect_uri;

        console.log(code);
        if (!code) throw new Error("No authorization code provided");

        const tokenResponse = await axios.post('https://api.webflow.com/oauth/access_token', {
            code,
            client_id,
            client_secret,
            redirect_URI: encodedRedirectUri,
            grant_type,
        });

        console.log('Token Response:', tokenResponse.data);

        const accessToken = tokenResponse.data.access_token;
        res.json({ access_token: accessToken });
    } catch (error) {
        console.error('Error exchanging code for access token:', error.message);
        console.log('Error Response:', error.response.data);
        res.status(error.response.status || 500).json({ error: 'Error during authentication' });
    }
};

export { webflowAuth, webflowAuthorized }