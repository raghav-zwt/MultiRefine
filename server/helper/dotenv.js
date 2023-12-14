import dotenv from "dotenv"

const dotenvFile = dotenv.config({ path: '.env' });
if (dotenvFile.error) {
    throw dotenvFile.error;
}

export { dotenvFile }