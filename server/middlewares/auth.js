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

const isAuthenticated = (req, res, next) => {
    if (req) {
      return next(); 
    } else {
      return res.status(401).json({ message: 'Unauthorized' }); 
    }
  };

export { accessTokenVerifier }