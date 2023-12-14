import { dotenvFile } from "../helper/dotenv.js"
import axios from "axios";

dotenvFile;

const getAccessToken = async (req, res) => {
    try {
        const { code } = req.body;
        console.log(code);
        const accessToken = await getWebFlowAccessToken(code);

        console.log(accessToken);
        return accessToken;
    } catch (error) {
        console.error('Error getting access token:', error.message);
        throw error;
    }
};

const getWebFlowAccessToken = async (wcode) => {
    try {
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

        console.log(data);

        const response = await axios.post('https://api.webflow.com/oauth/access_token', data);
        const accessToken = response.data.access_token;

        if (accessToken) {
            authorizedByUser(accessToken);
        }

        res.json({ message: 'Success', accessToken });
    } catch (error) {
        console.error('Error getting access token:', error.message);
        throw error;
    }
};

const authorizedByUser = async (bearerTokenAccess) => {
    try {
        const url = "https://api.webflow.com/v2/token/authorized_by";
        const bearer_token_access = "YOUR_BEARER_TOKEN"; // Replace with your actual bearer token

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${bearer_token_access}`,
            },
        });

        if (response.ok) {
            const result = await response.json();

            console.log(
                result.email,
                bearer_token_access
            );

            const Password = generatePassword(result.email, bearer_token_access);

            const data = (
                result.id,
                result.email,
                result.firstName,
                result.lastName,
                Password
            );

            console.log(data);

            const yourDate = new Date();
            const newDate = yourDate.toISOString().split("T")[0];

            const data2 = (result.id, newDate, bearer_token_access);

            console.log(data2);
        } else {
            console.error(`Error! status: ${response.status}`);
        }
    } catch (err) {
        console.error(err.message || err);
    }
};

function generatePassword(email, access_token) {
    let pass = "";
    let str = email + access_token;
    for (let i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
    }
    return pass;
}

export { getAccessToken }