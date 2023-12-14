import { dotenvFile } from "../helper/dotenv.js"
import axios from "axios";

dotenvFile;

const getAccessToken = async (req, res) => {
    try {
        const { code } = req.body;
        const accessToken = await getWebFlowAccessToken(code);
        res.json({ message: 'Success', accessToken });
    } catch (error) {
        console.error('Error getting access token:', error.message);
        throw error;
    }
};

const getWebFlowAccessToken = async (wcode) => {
    const clientId = process.env.WEBFLOW_CLIENT_KEY;
    const clientSecret = process.env.WEBFLOW_SECRET_KEY;
    const redirectUri = process.env.WEBFLOW_REDIRECT_URI;
    const authorizationCode = wcode;

    const data = {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code: authorizationCode,
    }

    const response = await axios.post('https://api.webflow.com/oauth/access_token', data);

    const accessToken = response.data.access_token;
    console.log('Access Token:', accessToken);
};

const authorizedByUser = (bearerTokenAccess) => {
    // Your existing implementation
};

export { getAccessToken }