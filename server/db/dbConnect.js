import mysql from "mysql2";
import dotenv from "dotenv";

const dotenvResult = dotenv.config({ path: '.env' });
if (dotenvResult.error) {
  throw dotenvResult.error;
}

const dbConnect = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

handleDisconnect();

dbConnect.on("connect", () => {
    console.log("Connected to the database!");
});

dbConnect.on("end", () => {
    console.log("Connection to the database ended.");
});

dbConnect.on("close", (err) => {
    console.log("Connection to the database closed.", err);
    handleDisconnect();
});

dbConnect.on("error", (err) => {
    console.error("Database error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("Reconnecting to the database...");
        handleDisconnect();
    } else {
        throw err;
    }
});

function handleDisconnect() {
    dbConnect.promise(function (err) {
        if (err) {
            console.log(`connectionRequest Failed`);
        } else {
            console.log(`DB connectionRequest Successful`);
        }
    });
}

export { dbConnect };