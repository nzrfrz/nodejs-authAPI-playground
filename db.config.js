import dotenv from "dotenv";
import mongoose from "mongoose";

import { UserCredentialsInit } from "./src/models/registration.model.js";

dotenv.config();

const MONGO_DB_URL = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;

let db = {};
db.mongoose = mongoose;
db.url = MONGO_DB_URL;

db.user_credentials = UserCredentialsInit(mongoose);

const DB = db;

export default DB;