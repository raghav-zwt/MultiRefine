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
        console.error(error);
        res.status(500).send('Internal Server Error');
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
            return res.status(401).send("Unauthorized");
        }

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
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
            return res.status(401).send("Unauthorized");
        }

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
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
            return res.status(401).send("Unauthorized");
        }

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const GetCollectionDetails = async (req, res) => {
    try {
        const Bearer = "";
        const collection_id = "";

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
            return res.status(401).send("Unauthorized");
        }

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const ListCollectionItems = async (req, res) => {
    try {
        const Bearer = "";
        const collection_id = "";

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
            return res.status(401).send("Unauthorized");
        }

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
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
            return res.status(401).send("Unauthorized");
        }

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export { Publishsite, ListSite, ListCollections, ListCollectionItems, GetSite, GetCollectionItem, GetCollectionDetails }