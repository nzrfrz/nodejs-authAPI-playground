import express  from "express";
import { AccessTokenGenerator } from "../controllers/accessTokenGenerator.js";

const router = express.Router();

export const GenerateAccessToken = (app) => {
    const generateAccessToken = router.get("/generate/accessToken", AccessTokenGenerator);

    app.use("/auth", generateAccessToken);
};
