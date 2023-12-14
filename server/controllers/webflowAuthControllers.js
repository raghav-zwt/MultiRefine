import { dotenvFile } from "../helper/dotenv.js"
import axios from "axios";

dotenvFile;

const webflowAuth = async (req, res) => {
    try {
        const { code } = req.query;
        const clientId = 'YOUR_WEBFLOW_CLIENT_ID';
        const clientSecret = 'YOUR_WEBFLOW_CLIENT_SECRET';
        const redirectUri = 'http://localhost:3001/webflow-auth';

        const tokenResponse = await axios.post('https://api.webflow.com/oauth/token', {
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: redirectUri,
        });

        const accessToken = tokenResponse.data.access_token;

        const userResponse = await axios.get('https://api.webflow.com/info', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const user = userResponse.data;

        res.json(user);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export { webflowAuth }