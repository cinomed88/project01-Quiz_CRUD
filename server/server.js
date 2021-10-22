'use strict';
import express from "express";
import router from "./router";
import auth from "./auth";
import cors from "cors";
import session from "express-session";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from "passport";
// const bcrypt = require("bcryptjs");
const FileStore = require('session-file-store')(session);

const app = express();
const port = process.env.PORT || 3001;
const questionPoint = "/projects/01/API/v2/questions";
const authPoint = "/projects/01/API/v2/auth";

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true
};

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(session({
    secret: "lucas gong", // secret code
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));
app.use(passport.initialize());
app.use(passport.session());
auth(passport);

// app.post(`${authPoint}/signup`, async (req, res) => {
//     // const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const newUser = {
//         username: req.body.username,
//         password: req.body.password,
//         auth: false
//     };
//     res.send("User Created");
// });

app.post(`${authPoint}/login`, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { 
        if (err) return next(err);
        if (!user) return res.send(false);
        req.logIn(user, (err) => {
            if (err) return next(err);
            console.log('authentificatie login:', user);/////
            console.log('session', req.session);/////
            return res.send(user);
        });
    })(req, res, next);
});

app.get(`${authPoint}/logout`, (req, res) => {
    req.logout();
    req.session.save(err => {
        if (err) throw err;
        res.send(true);
    });
});

app.use(questionPoint, router);

app.listen(port, () => {
    console.log(`The server is listening at http://localhost:${port}`);
});
