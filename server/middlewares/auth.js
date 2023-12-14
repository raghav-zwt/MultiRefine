const accessTokenVerifier = (req, res, next) => {
    try {
        const tokenHeader = req.headers['webflow-access-token']
        if (!tokenHeader) throw new Error('No Access Token Provided');
        next()
    } catch (error) {
        console.log(error);
        if (error) {
            throw new error
        }
    }
}

export { accessTokenVerifier }