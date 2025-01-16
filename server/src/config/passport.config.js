import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import jwt from "jsonwebtoken";
import {User} from "../models/user.models.js";
import { generateAccessTokenAndRefreshToken } from "../controllers/auth.controller.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8000/auth/google/callback",
            scope: ['profile', 'email']
        },
        async function (accessToken, refreshToken, profile, cb) {
            try {
                //First check if the user already exists
                let user = await User.findOne({ googleId: profile.id });
                //if user doesn't exist then create a new user
                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        fullName: profile.displayName,
                        provider: "google",
                        email: profile.emails?.[0]?.value,
                        avatar: profile.photos[0].value
                    });
                }

                //Generate token with id and role
                const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
                    await generateAccessTokenAndRefreshToken(user._id);

                    user.refreshToken = newRefreshToken;
                    await user.save({ validateBeforeSave: false });
                    const newUser = await User.findById(user._id).select(
                        "-password -refreshToken"
                    );

                return cb(null, { user: newUser, accessToken: newAccessToken, refreshToken: newRefreshToken });
            } catch (error) {
                cb(error, null);
            }
        }
    )
);


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));