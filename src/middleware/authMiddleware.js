import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; 
export const authenticateUser = (req, res, next) => {
  // Check if Authorization header is present
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Store the decoded user data in the request object
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};


export const authorizeAdmin = (req, res, next) => {
    console.log("user :",req.user)
    // Check if user is an admin
    if (req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Forbidden' });
    }
};
