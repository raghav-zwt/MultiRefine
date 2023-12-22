import { dbConnect } from "../db/dbConnect.js"

const filterAddList = async (req, res) => {
    try {
        const { user_id, site_id, name, type, layout, collection, date } = req.body;
        if (!user_id || !site_id || !name || !type || !layout || !collection || !date) {
            return res.status(401).json({
                message: 'All fields are required',
                success: false,
            });
        }
        const checkQuery = `SELECT COUNT(*) AS count FROM filter WHERE name = ? AND type = ? AND layout = ?`;
        const checkValues = [name, type, layout];
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
                    return res.status(200).send({
                        message: 'Filter already exists',
                        success: true,
                        data,
                    });
                }
                const insertQuery = "INSERT INTO filter (user_id, site_id, name, type, layout, collection, date) VALUES (?)";
                const insertValue = [user_id, site_id, name, type, layout, collection, date]
                dbConnect.query(insertQuery, [insertValue], (error, data) => {
                    try {
                        if (error) {
                            console.log(error);
                            return res.status(404).json({
                                message: "Error in query",
                                success: false,
                            });
                        };
                        return res.status(201).send({
                            message: "filter created",
                            success: true,
                            data,
                        });
                    } catch (error) {
                        return res.status(404).json({
                            message: "filter error",
                            success: false,
                        });
                    }
                })
            } catch (error) {
                return res.status(400).send({
                    message: 'Filter allready created, check again',
                    success: false
                })
            }
        });
    } catch (error) {
        return res.status(400).send({
            message: 'Error in filter create, try again.',
            success: false,
        });
    }
}

const userFilterList = async (req, res) => {
    try {
        const { userId } = req.body;
    } catch (error) {
        return res.status(400).send({
            message: 'Error in filter list, try again.',
            success: false,
        });
    }
}

export { filterAddList, userFilterList };
