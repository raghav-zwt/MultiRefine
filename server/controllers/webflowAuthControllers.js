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
        const code = req.body.code;

        console.log(code);
        if (!code) throw new Error("No authorization code provided");

        const sfsd = {
            code,
            client_id: clientID,
            client_secret: clientSecret,
            redirect_uri: redirectURI,
            grant_type: 'authorization_code',
        }

        console.log(sfsd);

        const tokenResponse = await axios.post('https://api.webflow.com/oauth/access_token',
            `code=${code}&client_id=${clientID}&client_secret=${clientSecret}&redirect_uri=${redirectURI}&grant_type=authorization_code`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }, {
            code,
            client_id: clientID,
            client_secret: clientSecret,
            redirect_uri: redirectURI,
            grant_type: 'authorization_code',
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