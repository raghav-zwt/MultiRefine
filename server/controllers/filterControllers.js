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

        console.log(date);

        const insertQuery = "INSERT INTO filter (user_id, site_id, name, type, layout, collection, date) VALUES (?)";
        const insertValue = [user_id, site_id, name, type, layout, collection, date]

        console.log(insertValue)

        dbConnect.query(insertQuery, [insertValue], (error, data) => {
            try {
                if (error) {
                    console.log(error);
                    return res.status(404).json({
                        message: "Error in query",
                        success: false,
                    });
                };

                console.log(data);

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
            message: 'Error in filter create, try again.',
            success: false,
        });
    }
}

export { filterAddList };
