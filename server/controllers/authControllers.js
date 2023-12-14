import { dotenvFile } from "../helper/dotenv.js"
import axios from "axios";

dotenvFile;

const auth = async (req, res) => {
    try {
        const { code } = req.body;
        res.json({ message: 'Success', code });
    } catch (error) {
        console.error('Error getting access token:', error.message);
        throw error;
    }
};


export { auth }