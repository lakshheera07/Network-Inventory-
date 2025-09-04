// roleCheckMiddleware.js

const roleCheckMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    // Assumes req.user is set by authentication middleware
    if (!req.user || !req.user.role) {
      return res.status(401).json({ error: "Unauthorized: No user info found" });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: `Forbidden: Requires one of: ${allowedRoles.join(", ")}` });
    }
    next();
  };
};

export default roleCheckMiddleware;
