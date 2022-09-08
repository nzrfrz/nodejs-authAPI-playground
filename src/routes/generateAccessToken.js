import express  from "express";
import { AccessTokenGenerator } from "../controllers/accessTokenGenerator.js";

const router = express.Router();

export const GenerateAccessToken = (app) => {
    const generateAccessToken = router.post("/accessToken", AccessTokenGenerator);

    app.use("/generate", generateAccessToken);
};
