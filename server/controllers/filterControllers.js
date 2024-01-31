import { dbConnect } from "../db/dbConnect.js"

const filterAddList = async (req, res) => {
    try {
        const { user_id, site_id, site_name, name, type, layout, collection, collection_category, collection_mapping, multiselect_switch, date } = req.body;
        if (!user_id || !site_id || !site_name || !name || !type || !layout || !collection || !collection_category || !collection_mapping || !date) {
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
                    const { status, data } = error.response || {};
                    return res.status(status || 500).json({ message: 'Error in query execution.', success: false, data: data });
                }
                if (data[0].count > 0) {
                    return res.status(400).send({
                        message: 'Filter already exists',
                        success: true,
                        data,
                    });
                }
                const insertQuery = "INSERT INTO filter (user_id, site_id, site_name, name, type, layout, collection, collection_category, collection_mapping, multiselect_switch, date) VALUES (?)";
                const insertValue = [user_id, site_id, site_name, name, type, layout, collection, collection_category, collection_mapping, multiselect_switch, date]
                dbConnect.query(insertQuery, [insertValue], (error, data) => {
                    try {
                        if (error) {
                            const { status, data } = error.response || {};
                            return res.status(status || 500).json({ message: 'Error in query execution.', success: false, data: data });
                        };
                        return res.status(201).send({
                            message: "filter created successfully.",
                            success: true,
                            data,
                        });
                    } catch (error) {
                        const { status, data } = error.response || {};
                        return res.status(status || 500).json({ message: 'Filter error.', success: false, data: data });
                    }
                })
            } catch (error) {
                const { status, data } = error.response || {};
                return res.status(status || 500).json({ message: 'Filter allready created, check again.', success: false, data: data });
            }
        });
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Error in filter create, try again.', success: false, data: data });
    }
}

const userFilterList = async (req, res) => {
    try {
        const { userID } = req.body;

        const sqlQuery = `SELECT * FROM filter WHERE user_id = ${userID}`;

        dbConnect.query(sqlQuery, (error, data) => {
            try {
                if (error) {
                    const { status, data } = error.response || {};
                    return res.status(status || 500).json({ message: 'Error in query execution.', success: false, data: data });
                };
                return res.status(200).send({
                    message: "Data fetched successfully.",
                    success: true,
                    data,
                });
            } catch (error) {
                const { status, data } = error.response || {};
                return res.status(status || 500).json({ message: 'Error in filter.', success: false, data: data });
            }
        })
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Error in filter list, try again.', success: false, data: data });
    }
}

const filterRemove = async (req, res) => {
    try {
        const id = req.params.id;
        const sqlDelete = "DELETE FROM filter WHERE id=?";
        const valueDelete = [[id]];

        dbConnect.query(sqlDelete, valueDelete, function (error, data) {
            if (error) {
                const { status, data } = error.response || {};
                return res.status(status || 500).json({ message: 'Error in query execution.', success: false, data: data });
            };
            return res.status(200).send({
                message: "filter deleted successfully.",
                success: true,
                data,
            });
        });
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Error in filter.', success: false, data: data });
    }
}

const userDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const sqlGet = "SELECT * FROM filter WHERE id=?";
        const valueGet = [[id]];
        dbConnect.query(sqlGet, valueGet, function (error, data) {
            if (error) {
                const { status, data } = error.response || {};
                return res.status(status || 500).json({ message: 'Error in query execution.', success: false, data: data });
            };
            return res.status(200).send({
                message: "Data fetched successfully.",
                success: true,
                data,
            });
        });
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Error in filter.', success: false, data: data });
    }
}

const filterUpdate = async (req, res) => {
    try {
        const id = req.params.id;

        const { name, type, layout, collection, collection_category, collection_mapping, multiselect_switch, date } = req.body;

        if (!name || !type || !layout || !collection || !collection_category || !collection_mapping || !date) {
            return res.status(401).json({
                message: 'All fields are required',
                success: false,
            });
        }

        const checkQuery = `SELECT COUNT(*) AS count FROM filter WHERE collection = ?`;
        const checkValues = [collection];

        dbConnect.query(checkQuery, checkValues, (error, data) => {
            try {
                if (error) {
                    const { status, data } = error.response || {};
                    return res.status(status || 500).json({ message: 'Error in query execution.', success: false, data: data });
                }
                if (data[0].count > 0) {
                    return res.status(400).send({
                        message: 'Filter already exists',
                        success: true,
                        data,
                    });
                }
                const updateQuery = `UPDATE filter SET name = ?, type = ?, layout = ?, collection = ?, collection_category = ?, collection_mapping = ?, multiselect_switch = ? , date = ? WHERE id = ${id}`;
                dbConnect.query(updateQuery, [name, type, layout, collection, collection_category, collection_mapping, multiselect_switch, date], (error, data) => {
                    try {
                        if (error) {
                            const { status, data } = error.response || {};
                            return res.status(status || 500).json({ message: 'Error in query execution.', success: false, data: data });
                        };
                        return res.status(200).send({
                            message: "filter updated successfully.",
                            success: true,
                            data,
                        });
                    } catch (error) {
                        const { status, data } = error.response || {};
                        return res.status(status || 500).json({ message: 'Error in filter.', success: false, data: data });

                    }
                })
            } catch (error) {
                const { status, data } = error.response || {};
                return res.status(status || 500).json({ message: 'Filter allready created, check again.', success: false, data: data });
            }
        });
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Error in filter.', success: false, data: data });
    }
}

const filterCss = async (req, res) => {
    try {
        const id = req.params.id;
        const { cssData } = req.body;

        const insertCss = `UPDATE filter SET css = ? WHERE id = ${id}`;
        const insertCssValue = cssData;

        dbConnect.query(insertCss, [insertCssValue], async function (error, data) {
            try {
                if (error) {
                    const { status, data } = error.response || {};
                    return res.status(status || 500).json({ message: 'Error in query execution.', success: false, data: data });
                }
                return res.status(200).send({
                    message: "CSS added successfully.",
                    success: true,
                    data
                });
            } catch (error) {
                const { status, data } = error.response || {};
                return res.status(status || 500).json({ message: 'Error in insert css.', success: false, data: data });
            }
        })
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Error in filter.', success: false, data: data });
    }
}

const getFilterCss = async (req, res) => {
    try {
        const id = req.params.id;

        const getCss = `SELECT * from filter WHERE id = ${id}`;

        dbConnect.query(getCss, async function (error, data) {
            try {
                if (error) {
                    const { status, data } = error.response || {};
                    return res.status(status || 500).json({ message: 'Error in query execution.', success: false, data: data });
                }
                return res.status(200).send({
                    message: "Data fetched successfully.",
                    success: true,
                    data
                });
            } catch (error) {
                const { status, data } = error.response || {};
                return res.status(status || 500).json({ message: 'Error in filter.', success: false, data: data });
            }
        });

    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Error in get filter data.', success: false, data: data });
    }
}

const embeddedCode = async (req, res) => {
    try {
        const { id } = req.params;

        const embeddedGet = `SELECT filter.id AS site_id, site_name, collection, collection_category, collection_mapping, multiselect_switch, type, layout, date, css, user.id AS user_id, user.hash_password, auth.access_token
        FROM filter
        JOIN user ON filter.user_id = user.id
        JOIN auth ON user.auth_id = auth.id
        WHERE filter.id = ${id}`;

        dbConnect.query(embeddedGet, async function (error, data) {
            try {
                if (error) {
                    const { status, data } = error.response || {};
                    return res.status(status || 500).json({ message: 'Error in query execution.', success: false, data: data });
                }
                return res.status(200).send({
                    message: "Data fetched successfully.",
                    success: true,
                    data
                });
            } catch (error) {
                const { status, data } = error.response || {};
                return res.status(status || 500).json({ message: 'Error in embedded code.', success: false, data: data });
            }
        })
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Error in embedded code.', success: false, data: data });
    }
}

const getSiteList = async (req, res) => {
    try {
        const { site_id } = req.body;

        const siteData = `SELECT * FROM filter WHERE site_id = ?`;

        dbConnect.query(siteData, [site_id], async function (error, data) {
            try {
                if (error) {
                    const { status, data } = error.response || {};
                    return res.status(status || 500).json({ message: 'Error in query execution.', success: false, data: data });
                }
                return res.status(200).send({
                    message: "Data fetched successfully.",
                    success: true,
                    data
                });
            } catch (error) {
                const { status, data } = error.response || {};
                return res.status(status || 500).json({ message: 'Error in site filter.', success: false, data: data });
            }
        });

    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Error in get filter data.', success: false, data: data });
    }
}

const cssRemove = async (req, res) => {
    try {
        const id = req.params.id;
        const sqlDelete = "UPDATE filter SET css = NULL WHERE id = ?;";
        const valueDelete = [[id]];

        dbConnect.query(sqlDelete, valueDelete, function (error, data) {
            if (error) {
                const { status, data } = error.response || {};
                return res.status(status || 500).json({ message: 'Error in query execution.', success: false, data: data });
            };
            return res.status(200).send({
                message: "CSS removed successfully.",
                success: true,
                data,
            });
        });
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Error in filter.', success: false, data: data });
    }
}


export { filterAddList, userFilterList, filterRemove, userDetails, filterUpdate, filterCss, getFilterCss, embeddedCode, getSiteList, cssRemove };
