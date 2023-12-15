import { dotenvFile } from "../helper/dotenv.js"
import axios from "axios";

dotenvFile;

const clientID = process.env.WEBFLOW_CLIENT_KEY;
const clientSecret = process.env.WEBFLOW_SECRET_KEY;
const redirectURI = 'https://jenil-gohel.vercel.app/';

const webflowAuth = async (req, res) => {
    const authUrl = `https://webflow.com/oauth/authorize?response_type=code&client_id=${clientID}`;
    res.redirect(authUrl);
};

const webflowAuthorized = async (req, res) => {
    console.log(req, res);

    const code = req.query.code;

    console.log(code);

    try {
        const tokenResponse = await axios.post('https://api.webflow.com/oauth/access_token', {
            code,
            client_id: clientID,
            client_secret: clientSecret,
            redirect_uri: redirectURI,
            grant_type: 'authorization_code',
        });

        console.log(tokenResponse);

        const accessToken = tokenResponse.data.access_token;

        console.log(accessToken)
        res.redirect(`${process.env.WEBFLOW_REDIRECT_URI}/?code=${accessToken}`);
    } catch (error) {
        console.error('Error exchanging code for access code:', error.message);
        res.status(500).send('Error during authentication');
    }
};

export { webflowAuth, webflowAuthorized }