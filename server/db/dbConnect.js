import mysql from "mysql2";
import dotenv from "dotenv";

const dotenvResult = dotenv.config({ path: '.env' });
if (dotenvResult.error) {
    console.error("Error loading .env file:", dotenvResult.error);
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
    connectTimeout: 10000,
    idleTimeout: 10000,
    queueLimit: 0,
    enableKeepAlive: true,
});


dbConnect.on("error", (err) => {
    console.error("Database pool error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("Reconnecting to the database...");
        handleDisconnect();
    } else {
        throw err;
    }
});

async function handleDisconnect() {
    try {
        const connection = await getConnection(dbConnect);
        console.log("DB connection successful");
        connection.release();
    } catch (error) {
        console.error("DB connection failed:", error.message);
    }
}

function getConnection(pool) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
}

function keepAlive() {
    dbPool.getConnection((err, connection) => {
        if (err) {
            console.error('Error in keepAlive:', err);
            return;
        }
        connection.ping((err) => {
            if (err) {
                console.error('Error pinging database:', err);
            }
            connection.release();
        });
    });
}

setInterval(keepAlive, 60000);

handleDisconnect();

export { dbConnect };