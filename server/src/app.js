import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import "./config/passport.config.js"


const app = express();

//initializing cors 
app.use(cors({
  origin: process.env.CORS_ORIGIN, // specify the domain you want to allow to access your API
  credentials: true, // enable sending cookies
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      sameSite: "none", // to handle chrome's secure cookie policy
      secure: false, // set to true if your using https
    },
  })
)

app.use(passport.initialize());
app.use(passport.session());

// parse request body as JSON and limit the size to 16KB
app.use(express.json({limit: "16kb"}));

// manages url parameters like "how to learn javascript" to "how%20to%20learn%20javascript"
app.use(express.urlencoded({extended: true}));

// serve static files from the "public" folder
app.use(express.static( "public"));


app.use(cookieParser());


//Routes import
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import { googleLogin, googleLoginCallback } from './controllers/Oauth.controller.js';



app.use("/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
// app.get("/auth/google", googleLogin);
// app.get("/auth/google/callback", googleLoginCallback);
app.get("/auth", (req, res) => {
  res.send('<a href="http://localhost:8000/auth/google/callback">Login with google</a>')
})




export { app }