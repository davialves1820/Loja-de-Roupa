import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";
import { Mongo } from "../database/mongo.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

// Configura a estratégia de autenticação

const collection_name = "users";

passport.use(new LocalStrategy.Strategy({user_name_field: "email"}, async (email, password, callback) => {
    const user= await Mongo.db.collection(collection_name).findOne({ email: email });

    if (!user) {
        return callback(null, false);
    }

    const salt_buffer = user.salt.saltBuffer

    crypto.pbkdf2(password, saltBuffer, 310000, 32, "sha256", (err, hashed_password) => {
        if (err) {
            return callback(null, false);
        }

        const user_password_buffer = Buffer.from(user.password.buffer);

        if (!crypto.timingSafeEqual(user_password_buffer, hashed_password)) {
            return callback(null, false);
        }

        const { password, salt, ...rest } = user;

        return callback(null, rest);
    })
}))

const auth_router = express.Router();

auth_router.post("/signup", async (req, res) => {
    const check_user = await Mongo.db.collection(collection_name).findOne({ email: req.body.email });

    if (check_user) {
        return res.status(500).send({
            sucess: false,
            statusCode: 500,
            body: {
                text: "User already exists!"
            }
        })
    }

    const salt = crypto.randomBytes(16);

    crypto.pbkdf2(req.body.password, salt, 310000, 16, "sha256", async (err, hashed_password) => {
        if (err) {
            return res.status(500).send({
                sucess: false,
                statusCode: 500,
                body: {
                    text: "Error on crypto password!",
                    err: err
                }
            })
        }

        const result = await Mongo.db.collection(collection_name).insertOne({
            email: req.body.email,
            password: hashed_password,
            salt
        })

        if (result.insertedId) {
            const user = await Mongo.db.collection(collection_name).findOne({
                _id: new ObjectId(result.insertedId)
            });

            const token = jwt.sign(user, "secret");

            return res.send({
                sucess: true,
                statusCode: 200,
                body: {
                    text: "User registered successfully!",
                    token,
                    user,
                    logged: true
                }
            });
        }
    })
})

export default auth_router;