// middlewares/user.js
import handleAsyncError from "./handleAsyncError.js";
import User from "../models/User.js";
import HandleError from "../utils/handleError.js";
import { verifyAccessToken, verifyRefreshToken, generateTokens } from "../utils/jwt_2.js";

export const verifyUser = handleAsyncError(async (req, res, next) => {
  console.log("req.cookies is ", req.cookies);
  const { accessToken, refreshToken } = req.cookies;
  
  if (!accessToken && !refreshToken) {
    return next(new HandleError("Not authenticated, please login to access resources", 401));
  }
  
  try {
    // Try to verify access token first
    if (accessToken) {
      const decodedData = verifyAccessToken(accessToken);
      console.log("Access token valid, decoded data is ", decodedData);
      req.user = await User.findById(decodedData.id);
      return next();
    }
  } catch (accessTokenError) {
    console.log("Access token invalid or expired, trying refresh token");
    
    // If access token is invalid/expired, try refresh token
    if (refreshToken) {
      try {
        const decodedRefreshData = verifyRefreshToken(refreshToken);
        console.log("Refresh token valid, generating new tokens");
        
        const user = await User.findById(decodedRefreshData.id);
        if (!user) {
          return next(new HandleError("User not found", 404));
        }
        
        // Generate new tokens
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(user);
        
        // Set new cookies
        const accessTokenOptions = {
          expires: new Date(Date.now() + (process.env.JWT_ACCESS_COOKIE_EXPIRE || 15) * 60 * 1000),
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        };
        
        const refreshTokenOptions = {
          expires: new Date(Date.now() + (process.env.JWT_REFRESH_COOKIE_EXPIRE || 7) * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        };
        
        res.cookie('accessToken', newAccessToken, accessTokenOptions);
        res.cookie('refreshToken', newRefreshToken, refreshTokenOptions);
        
        req.user = user;
        req.tokenRefreshed = true; // Flag to indicate token was refreshed
        return next();
        
      } catch (refreshTokenError) {
        console.log("Refresh token also invalid");
        return next(new HandleError("Session expired, please login again", 401));
      }
    }
  }
  
  return next(new HandleError("No valid authentication token found", 401));
});