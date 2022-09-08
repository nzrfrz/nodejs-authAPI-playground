import cors from "cors";
import express from "express";
import useragent from "express-useragent";
import dotenv from "dotenv";
import DB from "./db.config.js";

import { UserRegistration } from "./src/routes/registration.route.js";
import { UserLogin } from "./src/routes/login.route.js";
import { GenerateAccessToken } from "./src/routes/generateAccessToken.js";

dotenv.config();
const app = express();

let corsOptions = {
    optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(useragent.express());
app.use(express.urlencoded({ extended: true }));

DB.mongoose
    .connect(DB.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Database Connected");
    })
    .catch((error) => {
        console.log("Can't connect to database", error);
    });

app.get("/", (req, res) => {
    res.send("!!! NODEJS AUTH API PLAYGROUND !!!");
});

UserRegistration(app);
UserLogin(app);
GenerateAccessToken(app);

app.listen(process.env.PORT, () => {
    console.log(`App Running on: http://localhost:${process.env.PORT}`);
});