import express from "express";
import { Login } from "../controllers/login.controller.js";

const router = express.Router();

export const UserLogin = (app) => {
    const userLogin = router.post("/user/login", Login);

    app.use("/auth", userLogin);
};