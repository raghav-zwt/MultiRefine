import axios from "axios";

const Publishsite = async (site_id, Bearer) => {
    try {
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

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
}

const ListSite = async (Bearer) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://api.webflow.com/v2/sites',
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${Bearer}`
            }
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
}

const GetSite = async (site_id, Bearer) => {
    try {
        const options = {
            method: 'GET',
            url: `https://api.webflow.com/v2/sites/${site_id}`,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${Bearer}`
            }
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
}

const ListCollections = async (site_id, Bearer) => {
    try {
        const options = {
            method: 'GET',
            url: `https://api.webflow.com/v2/sites/${site_id}/collections`,
            headers: {
                accept: 'application/json',
                authorization: `'Bearer ${Bearer}`
            }
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
}

const GetCollectionDetails = async (collection_id, Bearer) => {
    try {
        const options = {
            method: 'GET',
            url: `https://api.webflow.com/v2/collections/${collection_id}`,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${Bearer}`
            }
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
}

const ListCollectionItems = async (collection_id, Bearer) => {
    try {
        const options = {
            method: 'GET',
            url: `https://api.webflow.com/v2/collections/${collection_id}/items`,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${Bearer}`
            }
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
}

const GetCollectionItem = async (collection_id, item_id, Bearer) => {
    try {
        const options = {
            method: 'GET',
            url: `https://api.webflow.com/v2/collections/${collection_id}/items/${item_id}`,
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${Bearer}`
            }
        };

        await axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    } catch (error) {
        console.error(error);
    }
}

export { Publishsite, ListSite, ListCollections, ListCollectionItems, GetSite, GetCollectionItem, GetCollectionDetails }