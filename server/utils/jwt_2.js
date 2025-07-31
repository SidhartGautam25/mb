// utils/jwt.js
import jwt from 'jsonwebtoken';

export const generateTokens = (user) => {
  const payload = { id: user._id };

  const accessToken = jwt.sign(payload, process.env.JWT_SEC_KEY, {
    // expiresIn: process.env.JWT_ACCESS_EXPIRE || '15m'
    expiresIn: '1m'
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_SEC_KEY, {
    // expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d'
    expiresIn: '7d'
  });

  return { accessToken, refreshToken };
};

// export const sendToken = (user, statusCode, res) => {
//   const { accessToken, refreshToken } = generateTokens(user);
//   const accessTokenOptions = {
//     expires: new Date(
//       Date.now() + 1 * 60 * 1000
//     ),
//     // expires:'15m',
//     httpOnly: true,
//     // secure: process.env.NODE_ENV === 'production',
//     // sameSite: 'strict'
//   };

//   const refreshTokenOptions = {
//     expires: new Date(
//       Date.now() + 7 * 24 * 60 * 60 * 1000
//     ),
//     // expires:'7d',
//     httpOnly: true,
//     // secure: process.env.NODE_ENV === 'production',
//     // sameSite: 'strict'
//   };

//   res.status(statusCode)
//     .cookie('accessToken', accessToken, accessTokenOptions)
//     .cookie('refreshToken', refreshToken, refreshTokenOptions)
//     .json({
//       success: true,
//       user,
//       accessToken // Optional: send in response body for client-side storage
//     });
// };

export const sendToken = (user, statusCode, res) => {
  const { accessToken, refreshToken } = generateTokens(user);
  
  const isProduction = process.env.NODE_ENV === 'production';
  const isLocalhost = !isProduction;
  
  // Common options for both tokens
  const commonOptions = {
    httpOnly: true,
    secure: isProduction, // HTTPS required in production
    path: '/',
    domain: isProduction ? '.cliftkart.com' : 'localhost'
  };

  // Access Token (short-lived)
  console.log("new date is ",new Date(Date.now()));
  const accessTokenOptions = {
    ...commonOptions,
    expires: new Date(Date.now() + 1 * 60 * 1000), // 15 minutes
    // maxAge: 1*60*1000,
    sameSite: isProduction ? 'none' : 'lax' // 'none' for cross-domain in production
  };

  // Refresh Token (long-lived)
  const refreshTokenOptions = {
    ...commonOptions,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    sameSite: isProduction ? 'none' : 'lax',
    path: '/api/v1/auth/refresh' // Only sent to refresh endpoint
  };

  // For development: additional relaxed settings
  if (isLocalhost) {
    accessTokenOptions.sameSite = 'lax';
    refreshTokenOptions.sameSite = 'lax';
    delete accessTokenOptions.domain; // localhost doesn't need domain
    delete refreshTokenOptions.domain;
  }
  console.log("sending cookies to the client")
  res.status(statusCode)
    .cookie('accessToken', accessToken, accessTokenOptions)
    .cookie('refreshToken', refreshToken, refreshTokenOptions)
    .json({
      success: true,
      user,
      accessToken // For client-side usage if needed
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