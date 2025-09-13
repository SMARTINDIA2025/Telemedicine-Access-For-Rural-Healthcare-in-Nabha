const jwt = require('jsonwebtoken');

export function verifyToken(token) {
  if (!token) {
    throw new Error('Authentication token is required');
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'your-jwt-secret');
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export function requireAuth(handler) {
  return async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      const decoded = verifyToken(token);
      
      // Add the decoded user info to the request
      req.user = decoded;
      
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
  };
}