import { dotenvFile } from "../helper/dotenv.js"
import axios from "axios";

dotenvFile;

const clientID = process.env.WEBFLOW_CLIENT_KEY;
const clientSecret = process.env.WEBFLOW_SECRET_KEY;
const redirectURI = process.env.WEBFLOW_REDIRECT_URI;

const webflowAuth = async (req, res) => {
    const authUrl = `https://webflow.com/oauth/authorize?response_type=code&client_id=${clientID}&scope=assets%3Aread+assets%3Awrite+authorized_user%3Aread+cms%3Aread+cms%3Awrite+custom_code%3Aread+custom_code%3Awrite+forms%3Aread+forms%3Awrite+pages%3Aread+pages%3Awrite+sites%3Aread+sites%3Awrite+users%3Aread+users%3Awrite+ecommerce%3Aread+ecommerce%3Awrite+site_activity%3Aread`;
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

const webflowAuthorizedBy = async (req, res) => {
    console.log(req.body);
    try {
        const token = req.body.tokenApi;

        console.log(token);

        const apiUrl = 'https://api.webflow.com/v2/token/authorized_by';

        const response = await axios.get(apiUrl, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${token}`
            },
        });

        const webflowAuthorizedUser = response.data;
        res.json(webflowAuthorizedUser);
    } catch (error) {
        console.error('Error fetching Webflow user data:', error.message);
        res.status(error.response ? error.response.status : 500).json({ error: 'Error fetching user data' });
    }
};

export { webflowAuth, webflowAuthorized, webflowAuthorizedBy }