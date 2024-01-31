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
            const { status, data } = error.response || {};
            return res.status(status || 500).json({ message: 'All fields are required.', success: false, data: data });
        }

        const sqlPassword = `SELECT * FROM user WHERE id = ?`;

        dbConnect.query(sqlPassword, [UserId], async function (error, data) {
            try {
                if (error) {
                    const { status, data } = error.response || {};
                    return res.status(status || 500).json({ message: 'Error in query execution.', success: false, data: data });
                }

                if (NewPassword === data[0].password) {
                    const { status, data } = error.response || {};
                    return res.status(status || 500).json({ message: 'Password same as older, change new.', success: false, data: data });
                }

                const hashPasswordCheck = await comparePassword(OldPassword, data[0].hash_password)

                if (hashPasswordCheck) {

                    const generatePassword = await hashPassword(NewPassword);

                    if (!generatePassword) {
                        const { status, data } = error.response || {};
                        return res.status(status || 500).json({ message: 'Password not generated, try again.', success: false, data: data });
                    }

                    const updatePassword = `UPDATE user SET password = ?, hash_password = ? WHERE id = ${UserId}`;

                    dbConnect.query(updatePassword, [NewPassword, generatePassword], async function (error, data) {
                        try {
                            if (error) {
                                const { status, data } = error.response || {};
                                return res.status(status || 500).json({ message: 'Error in query execution.', success: false, data: data });
                            }

                            return res.status(200).json({
                                message: 'Password updated successfully.',
                                success: true,
                                data
                            });

                        } catch (error) {
                            const { status, data } = error.response || {};
                            return res.status(status || 500).json({ message: 'Password not match.', success: false, data: data });
                        }
                    });
                } else {
                    const { status, data } = error.response || {};
                    return res.status(status || 500).json({ message: 'Password not match.', success: false, data: data });
                }

            } catch (error) {
                const { status, data } = error.response || {};
                return res.status(status || 500).json({ message: 'Error in change password.', success: false, data: data });
            }
        });
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Error in password.', success: false, data: data });
    }
}

export { profileUpdate }