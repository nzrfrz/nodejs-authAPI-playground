import express from "express";
import { Login } from "../controllers/login.controller.js";

const router = express.Router();

export const UserLogin = (app) => {
    const userLogin = router.post("/login", Login);

    app.use("/user", userLogin);
};