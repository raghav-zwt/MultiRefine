import { dotenvFile } from "../helper/dotenv.js"

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

export { getAccessToken }