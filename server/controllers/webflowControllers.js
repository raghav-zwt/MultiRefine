import axios from "axios";

const Publishsite = async (req, res) => {
    try {
        const site_id = "";
        const Bearer = "";

        const options = {
            method: 'POST',
            url: `https://api.webflow.com/v2/sites/${site_id}/publish`,
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${Bearer}`
            },
            data: { publishToWebflowSubdomain: false }
        };

        const response = await axios(options);
        res.json(response.data);
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Webflow api error.', success: false, data: data });
    }
}

const ListSite = async (req, res) => {
    try {
        const { Bearer } = req.body;

        const options = {
            method: 'GET',
            url: 'https://api.webflow.com/v2/sites',
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${Bearer}`
            }
        };

        const response = await axios(options);

        if (!response) {
            const { status, data } = error.response || {};
            return res.status(status || 500).json({ message: 'Webflow api unauthorized user.', success: false, data: data });
        }

        res.json(response.data);
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Webflow api error.', success: false, data: data });
    }
}

const GetSite = async (req, res) => {
    try {
        const site_id = "";
        const Bearer = "";

        const options = {
            method: 'GET',
            url: `https://api.webflow.com/v2/sites/${site_id}`,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${Bearer}`
            }
        };

        const response = await axios(options);

        if (!response) {
            const { status, data } = error.response || {};
            return res.status(status || 500).json({ message: 'Webflow api unauthorized user.', success: false, data: data });
        }

        res.json(response.data);
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Webflow api error.', success: false, data: data });
    }
}

const ListCollections = async (req, res) => {
    try {
        const { site_id, Bearer } = req.body;

        const options = {
            method: 'GET',
            url: `https://api.webflow.com/v2/sites/${site_id}/collections`,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${Bearer}`
            }
        };

        const response = await axios(options);

        if (!response) {
            const { status, data } = error.response || {};
            return res.status(status || 500).json({ message: 'Webflow api unauthorized user.', success: false, data: data });
        }

        res.json(response.data);
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Webflow api error.', success: false, data: data });
    }
}

const GetCollectionDetails = async (req, res) => {
    try {
        const { collection_id, Bearer } = req.body;

        const options = {
            method: 'GET',
            url: `https://api.webflow.com/v2/collections/${collection_id}`,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${Bearer}`
            }
        };

        const response = await axios(options);

        if (!response) {
            const { status, data } = error.response || {};
            return res.status(status || 500).json({ message: 'Webflow api unauthorized user.', success: false, data: data });
        }

        res.json(response.data);
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Webflow api error.', success: false, data: data });
    }
}

const ListCollectionItems = async (req, res) => {
    try {
        const { collection_id, Bearer } = req.body;

        const options = {
            method: 'GET',
            url: `https://api.webflow.com/v2/collections/${collection_id}/items`,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${Bearer}`
            }
        };

        const response = await axios(options);

        if (!response) {
            const { status, data } = error.response || {};
            return res.status(status || 500).json({ message: 'Webflow api unauthorized user.', success: false, data: data });
        }

        res.json(response.data);
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Webflow api error.', success: false, data: data });
    }
}

const GetCollectionItem = async (req, res) => {
    try {
        const Bearer = "";
        const collection_id = "";
        const item_id = "";

        const options = {
            method: 'GET',
            url: `https://api.webflow.com/v2/collections/${collection_id}/items/${item_id}`,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${Bearer}`
            }
        };

        const response = await axios(options);

        if (!response) {
            const { status, data } = error.response || {};
            return res.status(status || 500).json({ message: 'Webflow api unauthorized user.', success: false, data: data });
        }

        res.json(response.data);
    } catch (error) {
        const { status, data } = error.response || {};
        return res.status(status || 500).json({ message: 'Webflow api error.', success: false, data: data });
    }
}

export { Publishsite, ListSite, ListCollections, ListCollectionItems, GetSite, GetCollectionItem, GetCollectionDetails }