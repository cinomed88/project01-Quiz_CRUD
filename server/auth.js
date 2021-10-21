'use strict';
import db from "./config";
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const auth = (passport) => {
    passport.use( new LocalStrategy((username, password, done) => {        
        console.log('localstr', username, password);/////

        db.getConnection((err, conn) => {
            if (err) throw err;
            const getSql = "SELECT * FROM Users WHERE username=?";
            conn.query(getSql,[ username ], (err, dbData) => {
                if (err) console.log(`query error : ${err}`);
                console.log(dbData);
                if (!dbData) return done(null, false);
                if (dbData[0].password === password){
                    return done(null, dbData[0]);
                } else {
                    return done(null, false, { message: "Incorrect Passqord!"});
                }
                // bcrypt.compare(password, dbData.password, (err, result) => {
                //     if (err) throw err;
                //     if (result) {
                //         return done(null, dbData);
                //     } else {
                //         return done(null, false);
                //     }
                // });
            });
            conn.release(err => {
                if (err) throw err
                console.log('Closed database connection.');
            });  
        });
    }));

    passport.serializeUser((user, done) => {
        console.log('serializeUser', user);
        done(null, user.username);
    });

    passport.deserializeUser((id, done) => {
        console.log('deserializeUser', id);
        done(null, id)
        // User.findOne({ _id: id }, (err, user) => {
        //     const userInfo = { username: user.username };
        //     done(err, userInfo);
        // });
    });
};

export default auth;