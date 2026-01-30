import dotenv from 'dotenv';
dotenv.config();

// Hardcoded user ID for Personal Mode
const PERSONAL_USER_ID = "660000000000000000000001";

export const auth = (req, res, next) => {
  // In Personal Mode, we bypass token check and use a static ID
  req.userId = PERSONAL_USER_ID;
  next();
};
