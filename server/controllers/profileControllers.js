import { dbConnect } from "../db/dbConnect.js";
import { dotenvFile } from "../helper/dotenv.js"
import { comparePassword, hashPassword } from "../middlewares/hashPassword.js";

dotenvFile;

const profileUpdate = async (req, res) => {
    console.log(req.body);
    try {
        const UserId = req.params.id;
        const { NewPassword, OldPassword, ConfirmPassword } = req.body;

        if (!UserId, !NewPassword || !OldPassword || !ConfirmPassword) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false,
            });
        }

        const sqlPassword = `SELECT * FROM user WHERE id = ?`;

        dbConnect.query(sqlPassword, [UserId], async function (error, data) {
            try {
                if (error) {
                    console.log(error);
                    return res.status(400).json({
                        message: 'Error in query',
                        success: false,
                    });
                }

                if (NewPassword === data[0].password) {
                    return res.status(400).json({
                        message: "Password same as older, change new.",
                        success: false
                    })
                }

                const hashPasswordCheck = await comparePassword(OldPassword, data[0].hash_password)

                if (hashPasswordCheck) {

                    const generatePassword = await hashPassword(NewPassword);

                    if (!generatePassword) {
                        return res.status(400).json({
                            message: "Password not generated, try again.",
                            success: false
                        })
                    }

                    const updatePassword = `UPDATE user SET password = ?, hash_password = ? WHERE id = ${UserId}`;

                    dbConnect.query(updatePassword, [NewPassword, generatePassword], async function (error, data) {
                        try {
                            if (error) {
                                console.log(error);
                                return res.status(400).json({
                                    message: 'Error in query',
                                    success: false,
                                });
                            }

                            return res.status(200).json({
                                message: 'password updated',
                                success: true,
                                data
                            });

                        } catch (error) {
                            console.log(error);
                            return res.status(400).json({
                                message: 'Password not match',
                                success: false,
                                error
                            });
                        }
                    });
                } else {
                    return res.status(400).json({
                        message: 'Password not match',
                        success: false,
                    });
                }

            } catch (error) {
                console.log(error);
                return res.status(400).send({
                    message: "Error in change password",
                    success: false,
                    error
                });
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "Error in filter",
            success: false,
        });
    }
}

export { profileUpdate }