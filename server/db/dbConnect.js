import mysql from "mysql2";
import dotenv from "dotenv";

// Load environment variables
const dotenvResult = dotenv.config({ path: '.env' });
if (dotenvResult.error) {
    console.error("Error loading .env file:", dotenvResult.error);
    throw dotenvResult.error;
}

// Create a connection pool
const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

// Handle connection pool events
dbPool.on("acquire", (connection) => {
    console.log("Connection %d acquired", connection.threadId);
});

dbPool.on("connection", (connection) => {
    console.log("New database connection created");
});

dbPool.on("enqueue", () => {
    console.log("Waiting for available connection slot");
});

dbPool.on("release", (connection) => {
    console.log("Connection %d released", connection.threadId);
});

// Handle errors in the connection pool
dbPool.on("error", (err) => {
    console.error("Database pool error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("Reconnecting to the database...");
        handleDisconnect();
    } else {
        throw err;
    }
});

// Connect to the database
async function handleDisconnect() {
    try {
        const connection = await getConnection(dbPool);
        console.log("DB connection successful");
        // Perform your database operations here
        connection.release();
    } catch (error) {
        console.error("DB connection failed:", error.message);
    }
}

// Function to get a connection from the pool
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

// Call the handleDisconnect function
handleDisconnect();

export { dbConnect };