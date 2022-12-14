import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { authManager } from "./authManager.js";
import { 
    responseHelper, 
    responseMessage, 
    responseStatus 
} from "../_helpers/ResponseHelper.js";

dotenv.config();

export const AccessTokenGenerator = async (req, res) => {
    // const { browser, version, os, platform, isMobile } = req.headers;

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === undefined) return responseHelper(res, responseStatus().errorRequest, responseMessage().requiredToken, {});
    
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (error, tokenResults) => {
        if (error) return responseHelper(res, responseStatus().errorServer, responseMessage().errorVerifyToken, {});
        const userVerify = await authManager.checkUserByID(tokenResults.id);
        if (userVerify.refreshToken === token) {
            const currentTokenData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            const accessToken = jwt.sign(currentTokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "365d" });
            responseHelper(res, responseStatus().success, responseMessage().validToken, accessToken);
            // console.log(currentTokenData);
        }
        else {
            responseHelper(res, responseStatus().errorRequest, responseMessage().invalidToken, {});
        }
    });

    // const currentTokenData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    // switch (true) {
    //     case currentTokenData.browser !== browser || currentTokenData.version !== version || currentTokenData.os !== os || currentTokenData.platform !== platform || currentTokenData.isMobile !== isMobile:
    //         responseHelper(res, responseStatus().errorRequest, responseMessage().invalidToken, {});
    //         break;  
    //     default:
    //         const accessToken = jwt.sign(currentTokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "365d" });
    //         responseHelper(res, responseStatus().success, responseMessage().validToken, accessToken);
    //         break;
    // };
    // responseHelper(res, responseStatus().success, "CHECK LOGS", {});
};