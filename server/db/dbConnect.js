import mysql from "mysql2";
import dotenv from "dotenv";

const dotenvResult = dotenv.config({ path: '.env' });
if (dotenvResult.error) {
    console.log(dotenvResult.error);
    throw dotenvResult.error;
}

const dbConnect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,    
    queueLimit: 0,
    connectTimeout: 5000, // 30 seconds timeout
});

dbConnect.on("connect", () => {
    console.log("Connected to the database!");
});

dbConnect.on("end", () => {
    console.log("Connection to the database ended.");
    handleDisconnect();
});

dbConnect.on("close", (err) => {
    console.log("Connection to the database closed.", err);
    handleDisconnect();
});

handleDisconnect();

if (dbConnect && dbConnect.state === "disconnected") {
    console.log("The connection is disconnected.");
    handleDisconnect();
} else {
    console.log("The connection is active.");
}

dbConnect.on("error", (err) => {
    console.error("Database error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("Reconnecting to the database...");
        handleDisconnect();
    } else {
        console.log(err);
        throw err;
    }
});

function handleDisconnect() {
    dbConnect.connect(function (err) {
        if (err) {
            console.log(`connectionRequest Failed`);
        } else {
            console.log(`DB connectionRequest Successful`);
        }
    });
}

export { dbConnect };