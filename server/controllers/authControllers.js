import { dbConnect } from "../db/dbConnect.js";
import { dotenvFile } from "../helper/dotenv.js"
import { comparePassword, hashPassword } from "../middlewares/hashPassword.js";
import jwt from "jsonwebtoken";
import axios from "axios";

dotenvFile;

const clientID = process.env.WEBFLOW_CLIENT_KEY;

const webflowAuth = async (req, res) => {

    if (!clientID) {
        return res.status(401).json({ message: 'No auth URL provided' });
    }

    const authUrl = `https://webflow.com/oauth/authorize?response_type=code&client_id=${clientID}&scope=assets%3Aread+assets%3Awrite+authorized_user%3Aread+cms%3Aread+cms%3Awrite+custom_code%3Aread+custom_code%3Awrite+forms%3Aread+forms%3Awrite+pages%3Aread+pages%3Awrite+sites%3Aread+sites%3Awrite+users%3Aread+users%3Awrite+ecommerce%3Aread+ecommerce%3Awrite+site_activity%3Aread`;

    if (!authUrl) {
        return res.status(401).json({ message: 'No auth url provided' });
    }

    res.redirect(authUrl);
};

const webflowAuthorized = async (req, res) => {
    try {
        const { code, client_id, client_secret, redirect_uri, grant_type } = req.body;
        const encodedRedirectUri = redirect_uri;

        console.log(code);

        if (!code) {
            res.status(error.response.status || 500).json({ message: 'Code not found during authentication' });
        };

        const tokenResponse = await axios.post('https://api.webflow.com/oauth/access_token', {
            code,
            client_id,
            client_secret,
            redirect_URI: encodedRedirectUri,
            grant_type,
        });

        console.log('Token Response:', tokenResponse.data);

        const accessToken = tokenResponse.data.access_token;

        res.json({ access_token: accessToken });
    } catch (error) {
        console.error('Error exchanging code for access token:', error.message);
        console.log('Error Response:', error.response.data);
        res.status(error.response.status || 500).json({ message: 'Error during authentication' });
    }
};

const webflowAuthorizedBy = async (req, res) => {
    console.log(req.body);
    try {
        const token = req.body.tokenApi;

        if (!token) {
            res.status(error.response ? error.response.status : 500).json({ message: 'Token not found' });
        }

        const apiUrl = 'https://api.webflow.com/v2/token/authorized_by';

        const response = await axios.get(apiUrl, {
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${token}`
            },
        });

        const webflowAuthorizedUser = response.data;

        if (!webflowAuthorizedUser) {
            res.status(error.response ? error.response.status : 500).json({ message: 'Error in authorized' });
        }

        const date = new Date();

        const checkQuery = `SELECT COUNT(*) AS count FROM auth WHERE webflow_id = ?`;
        const checkValues = [webflowAuthorizedUser.id];

        dbConnect.query(checkQuery, checkValues, (error, data) => {
            try {
                if (error) {
                    console.log(error);
                    return res.status(404).send({
                        message: "Error in query",
                        success: false,
                    });
                }

                if (data[0].count > 0) {
                    const updateQuery = "UPDATE auth SET access_token = ?, date_time = ? WHERE webflow_id = ?";
                    const updateValues = [token, date, webflowAuthorizedUser.id];

                    dbConnect.query(updateQuery, updateValues, (error, data) => {
                        try {
                            if (error) {
                                console.log(error);
                                return res.status(404).json({
                                    message: "Error updating access token.",
                                    success: false,
                                });
                            }

                            return res.status(200).send({
                                message: 'Access token updated',
                                success: true,
                            });
                        } catch (error) {
                            return res.status(404).json({
                                message: "Error updating access token.",
                                success: false,
                            });
                        }
                    });
                } else {
                    const insertQuery = "INSERT INTO auth (webflow_id, date_time, access_token) VALUES (?, ?, ?)";
                    const insertValues = [webflowAuthorizedUser.id, date, token];

                    dbConnect.query(insertQuery, insertValues, (error, data) => {
                        try {
                            if (error) {
                                console.log(error);
                                return res.status(404).json({
                                    message: "Error in query.",
                                    success: false,
                                });
                            }

                            return res.status(201).send({
                                message: "Access token verified",
                                success: true,
                                data,
                            });
                        } catch (error) {
                            return res.status(404).json({
                                message: "Access token not verified.",
                                success: false,
                            });
                        }
                    });
                }
            } catch (error) {
                return res.status(400).send({
                    message: 'Access token already created, check again',
                    success: false
                });
            }
        });

    } catch (error) {
        console.error('Error fetching Webflow user data:', error);
        res.status(error.response ? error.response.status : 500).json({ message: 'Error fetching user data' });
    }
};

const webflowRegister = async (req, res) => {
    try {
        const { id, email, firstName, lastName } = req.body;

        if (!id || !email || !firstName || !lastName) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        let length = 12;
        let charset = id + firstName + lastName;
        let password = "";

        for (let i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }

        const generatePassword = await hashPassword(password);

        if (!generatePassword) {
            return res.status(400).json({
                message: "Password not generated, try again.",
                success: false
            })
        }

        const authLogin = {
            "auth_id": id,
            "email": email,
            "first_name": firstName,
            "last_name": lastName,
            "password": password,
            "hash_password": generatePassword
        }

        console.log(authLogin);

        const sqlInsert = "INSERT INTO user (auth_id, email, first_name, last_name, password, hash_password) VALUES (?)"
        const sqlValues = [authLogin.auth_id, authLogin.email, authLogin.first_name, authLogin.last_name, authLogin.password, authLogin.hash_password]

        dbConnect.query(sqlInsert, [sqlValues], async function (error, data) {
            try {
                if (error) {
                    console.log(error);
                    return res.status(404).json({
                        message: "Error in query.",
                        success: false,
                    });
                };

                const token = await jwt.sign(
                    {
                        auth_id: data.auth_id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d",
                    }
                );

                return res.status(201).send({
                    message: "Webflow user register successfully.",
                    success: true,
                    data,
                    token
                });
            } catch (error) {
                return res.status(404).json({
                    message: "Webflow user not register.",
                    success: false,
                });
            }
        })
    } catch (error) {
        console.error('Error register', error.message);
        res.status(error.response ? error.response.status : 500).json({ message: 'Error register' });
    }
}

const webflowLogin = async (req, res) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;

        console.log(email, password)

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        const emailQuery = `SELECT id, auth_id, first_name, last_name, email, hash_password FROM user WHERE email = ?`;

        dbConnect.query(emailQuery, [email], async function (error, data) {
            if (error) {
                console.log(error);
            }

            if (data.length === 0) {
                return res.status(404).json({
                    message: "Email id is not register",
                    success: false,
                });
            } else {
                const validPassword = data[0].hash_password;

                if (!validPassword) {
                    return res.status(404).json({
                        message: "password not found",
                        success: false,
                    });
                }

                const matchPassword = await comparePassword(password, validPassword);

                if (!matchPassword) {
                    return res.status(404).json({
                        message: "password not match !",
                        success: false,
                    });
                } else {
                    const token = await jwt.sign(
                        {
                            auth_id: data.auth_id,
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "7d",
                        }
                    );

                    res.cookie("user", data, {
                        httpOnly: true,
                        maxAge: 72 * 60 * 60 * 1000,
                        secure: true,
                        sameSite: 'None',
                    });

                    return res.status(200).send({
                        message: "Login successfully !",
                        success: true,
                        data,
                        token,
                    });
                }
            }
        })

    } catch (error) {
        console.error('Error login', error.message);
        res.status(error.response ? error.response.status : 500).json({ message: 'Error login' });
    }
}

const getToken = async (req, res) => {
    try {
        const id = req.params.id;
        const sqlToken = `SELECT auth.access_token FROM user JOIN auth ON user.auth_id = auth.id WHERE user.id = ${id}`;

        dbConnect.query(sqlToken, async function (error, data) {
            if (error) {
                return res.status(400).json({
                    message: "Error in access token",
                    success: false
                })
            }
            return res.status(200).send({
                message: "access token",
                success: true,
                data,
            })
        })
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ message: 'Error token' });
    }
}

export { webflowAuth, webflowAuthorized, webflowAuthorizedBy, webflowRegister, webflowLogin, getToken }