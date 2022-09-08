import express from "express";
import { Registration } from "../controllers/registration.controller.js";

const router = express.Router();

export const UserRegistration = (app) => {
    const userRegistration = router.post("/user/registration", Registration);

    app.use("/auth", userRegistration);
};