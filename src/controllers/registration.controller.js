import bcrypt from "bcrypt";
import DB from "../../db.config.js";

import { 
    responseHelper, 
    responseMessage, 
    responseStatus 
} from "../_helpers/ResponseHelper.js";
import { authManager } from "./authManager.js";

const USER_CREDENTIALS = DB.user_credentials;

export const Registration = async (req, res) => {
    const { userName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const payload = new USER_CREDENTIALS(
        {
            userName,
            email,
            password: hashedPassword,
        }
    );

    const checkExistingUsername = await authManager.checkUserName(userName);
    const checkExistingEmail = await authManager.checkUserEmail(email);
    const isUsernameExist = checkExistingUsername[0] ? true : false;
    const isUserEmailExist = checkExistingEmail[0] ? true : false;

    switch (true) {
        case isUsernameExist && isUserEmailExist:
            responseHelper(
                res, 
                responseStatus().errorRequest, 
                { 
                    errorUserNameExist: responseMessage().errorUserNameExist,
                    errorEmailExist: responseMessage().errorEmailExist 
                }, 
                {}
            );
            break;
        case isUsernameExist:
            responseHelper(res, responseStatus().errorRequest, responseMessage().errorUserNameExist, {});
            break;
        case isUserEmailExist:
            responseHelper(res, responseStatus().errorRequest, responseMessage().errorEmailExist, {});
            break;
        case !isUsernameExist && !isUserEmailExist:
            payload.save((error, results) => {
                if (results) {
                    responseHelper(res, responseStatus().success, responseMessage().registrationSuccess, {userName, email});
                }
                else {
                    responseHelper(res, responseStatus().errorServer, responseMessage().errorServer || error, {});
                }
            });
            break;
        default:
            break;
    };
};