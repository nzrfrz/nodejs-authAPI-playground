import DB from "../../db.config.js";

const USER_CREDENTIALS = DB.user_credentials;

class query {

    checkUserByID = (data) => new Promise((resolve, reject) => {
        USER_CREDENTIALS.findOne({ _id: data }, (error, results) => {
            resolve(results);
            reject(error);
        });
    });

    checkUserName = (data) => new Promise((resolve, reject) => {
        USER_CREDENTIALS.find({ userName: data }, (error, results) => {
            resolve(results);
            reject(error);
        });
    });

    checkUserEmail = (data) => new Promise((resolve, reject) => {
        USER_CREDENTIALS.find({ email: data }, (error, results) => {
            resolve(results);
            reject(error);
        });
    });

};

export const authManager = new query();