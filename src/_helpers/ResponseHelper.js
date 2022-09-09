export const responseStatus = () => {
    return {
        success: 200,
        errorServer: 500,
        errorRequest: 400,
    }
};

export const responseMessage = () => {
    return {
        errorServer: "Something went wrong, please try again later !!",
        errorUserNameExist: "Username exist, try another username",
        errorEmailExist: "Email already associated with this account",
        registrationSuccess: "Registration successfully !!!",
        errorPassword: "Wrong password, please try again !!!",
        errorVerifyToken: "Something wrong when verifying token, please try again later !!!",
        errorGeneratingToken: "Something wrong when generating token, please try again later !!!",
        loginSuccess: "Login Succesfully !!!",
        requiredToken: "Token required !!!",
        invalidToken: "Token invalid !!!",
        validToken: "Token is valid !!!"
    }
};

export const responseHelper = (res, status, message, data) => {
    return res.status(status).send({ status, message, data });
};