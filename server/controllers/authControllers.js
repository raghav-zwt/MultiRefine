import { dotenvFile } from "../helper/dotenv.js"
import axios from "axios";

dotenvFile;

const auth = async (req, res) => {
    try {
        const webflowAuthUrl = `https://webflow.com/oauth/authorize?response_type=code&client_id=${process.env.WEBFLOW_CLIENT_KEY}&redirect_uri=${process.env.WEBFLOW_REDIRECT_URI}`;
        res.redirect(webflowAuthUrl);
    } catch (error) {
        console.error('Error getting access token:', error.message);
        throw error;
    }
};

const authCallBack = async (wcode) => {
    const code = req.query.code;
    const tokenUrl = 'https://webflow.com/oauth/token';

    const response = await axios.post(tokenUrl, {
        code,
        client_id: 'YOUR_CLIENT_ID',
        client_secret: 'YOUR_CLIENT_SECRET',
        redirect_uri: 'http://localhost:3000/callback',
        grant_type: 'authorization_code',
    });

    const accessToken = response.data.access_token;

    res.send('Authorization successful!');
};

export { auth, authCallBack }