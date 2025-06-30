// utils/jwt.js
import jwt from 'jsonwebtoken';

export const generateTokens = (user) => {
  const payload = { id: user._id };
  
  const accessToken = jwt.sign(payload, process.env.JWT_SEC_KEY, {
    // expiresIn: process.env.JWT_ACCESS_EXPIRE || '15m'
    expiresIn:'1m'
  });
  
  const refreshToken = jwt.sign(payload, process.env.JWT_SEC_KEY, {
    // expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d'
    expiresIn:'7d'
  });
  
  return { accessToken, refreshToken };
};

export const sendToken = (user, statusCode, res) => {
  const { accessToken, refreshToken } = generateTokens(user);
  
  const accessTokenOptions = {
    expires: new Date(
      Date.now() +  1 * 60 * 1000
    ),
    // expires:'15m',
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    // sameSite: 'strict'
  };
  
  const refreshTokenOptions = {
    expires: new Date(
      Date.now() +  7*24 * 60 * 60 * 1000
    ),
    // expires:'7d',
    httpOnly: true,
    // secure: process.env.NODE_ENV === 'production',
    // sameSite: 'strict'
  };
  
  res.status(statusCode)
    .cookie('accessToken', accessToken, accessTokenOptions)
    .cookie('refreshToken', refreshToken, refreshTokenOptions)
    .json({
      success: true,
      user,
      accessToken // Optional: send in response body for client-side storage
    });
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SEC_KEY);
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SEC_KEY);
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};