import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { authManager } from "./authManager.js";
import { 
    responseHelper, 
    responseMessage, 
    responseStatus 
} from "../_helpers/ResponseHelper.js";
import DB from "../../db.config.js";

dotenv.config();
const USER_CREDENTIALS = DB.user_credentials;

function omit(obj, ...props) {
    const result = { ...obj };
    props.forEach(function(prop) {
        delete result[prop];
    });
    return result;
};

function returnData(rawObject) {
    const newData = {id: rawObject.id, ...rawObject._doc}
    const removeDefaultID = omit(newData, "_id");
    const removeV = omit(removeDefaultID, "__v");
    const finalData = omit(removeV, "password");
    return finalData;
};

export const Login = async (req, res) => {
    const { user, password } = req.body;

    const checkExistingUsername = await authManager.checkUserName(user);
    const checkExistingEmail = await authManager.checkUserEmail(user);
    const isUsernameExist = checkExistingUsername[0] ? true : false;
    const isUserEmailExist = checkExistingEmail[0] ? true : false;

    const dataToSign = {
        id: checkExistingUsername[0]?.id || checkExistingEmail[0]?.id,
        userName: checkExistingUsername[0]?.userName || checkExistingEmail[0]?.userName,
        email: checkExistingUsername[0]?.email || checkExistingEmail[0]?.email,
        browser: req.headers.browser,
        version: req.headers.version,
        os: req.headers.os,
        platform: req.headers.platform,
    };

    const refreshToken = jwt.sign(dataToSign, process.env.REFRESH_TOKEN_SECRET);

    const payload = {
        browser: dataToSign.browser,
        version: dataToSign.version,
        os: dataToSign.os,
        platform: dataToSign.platform,
        userRole: "",
        refreshToken: refreshToken
    };

    if (isUsernameExist) {
        try {
            if (await bcrypt.compare(password, checkExistingUsername[0].password)) {
                USER_CREDENTIALS.findOneAndUpdate({ _id: checkExistingUsername[0].id }, payload, {new: true}, (error, results) => {
                    if (results) {
                        responseHelper(res, responseStatus().success, responseMessage().loginSuccess, returnData(results));
                    } else {
                        responseHelper(res, responseStatus().errorServer, responseMessage().errorServer, error);
                    }
                });
            } else {
                responseHelper(res, responseStatus().errorRequest, responseMessage().errorPassword, {});
            }
        } catch (error) {
            responseHelper(res, responseStatus().errorRequest, responseMessage().errorServer, error);
        }
    } 
    else if (isUserEmailExist) {
        try {
            if (await bcrypt.compare(password, checkExistingEmail[0].password)) {
                USER_CREDENTIALS.findOneAndUpdate({ _id: checkExistingEmail[0].id }, payload, {new: true}, (error, results) => {
                    if (results) {
                        responseHelper(res, responseStatus().success, responseMessage().loginSuccess, returnData(results));
                    } else {
                        responseHelper(res, responseStatus().errorServer, responseMessage().errorServer, error);
                    }
                });
            } else {
                responseHelper(res, responseStatus().errorRequest, responseMessage().errorPassword, {});
            }
        } catch (error) {
            responseHelper(res, responseStatus().errorRequest, responseMessage().errorServer, error);
        }
    }
    else {
        responseHelper(res, responseStatus().errorRequest, "EMAIL OR USERNAME NOT FOUND", {});
    }

    // responseHelper(res, responseStatus().success, "CHECK LOGS", {});
};