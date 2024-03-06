const isAuthenticated = (req, res, next) => {
    // Check if user is authenticated
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to next middleware
    }
    // If user is not authenticated, return unauthorized error
    return res.status(401).json({ error: "Unauthorized" });
};

export default isAuthenticated