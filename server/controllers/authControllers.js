import { dotenvFile } from "../helper/dotenv.js"
import axios from "axios";

dotenvFile;

const auth = async (req, res) => {
    try {
        const webflowAuthUrl = `https://webflow.com/oauth/authorize?client_id=".${process.env.WEBFLOW_CLIENT_KEY}."&response_type=code&state=".${process.env.WEBFLOW_SECRET_KEY}`;
        res.redirect(webflowAuthUrl);
    } catch (error) {
        console.error('Error getting access token:', error.message);
        throw error;
    }
};

const authCallBack = async (wcode) => {
    const code = req.query.code;
    const tokenUrl = 'https://api.webflow.com/oauth/access_token';

    const response = await axios.post(tokenUrl, {
        code,
        client_id: process.env.WEBFLOW_CLIENT_KEY,
        client_secret: process.env.WEBFLOW_SECRET_KEY,
        redirect_uri: process.env.WEBFLOW_REDIRECT_URI,
        grant_type: 'authorization_code',
    });

    const accessToken = response.data.access_token;

    res.send('Authorization successful!', accessToken);
};

export { auth, authCallBack }