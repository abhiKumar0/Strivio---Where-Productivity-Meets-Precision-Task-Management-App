import { User } from "../models/user.models.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { OPTIONS } from "../constants.js";


const generateAccessTokenAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500,"Error generating access token and refresh token");
        
    }
}


const register = AsyncHandler(async (req, res) => {
    const {fullName, username, email, password} = req.body;
    // console.log(req.body)
    if (!fullName || !username || !email || !password) {
        return res.status(400).json({message: "Please fill in all fields"});
    }

    const existingUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if (existingUser){
        throw new ApiError(400, "User already exists");
    }

    const user = await User.create({
        fullName,
        username,
        email,
        password
    })

    const newUser = await User.findById(user._id).select("-password -refreshToken");
    if (!newUser) {
        throw new ApiError(500, "Something went while registering the user");
    }

    return res.status(200).json(new ApiResponse(200, newUser, "User registered successfully"));
})

const login = AsyncHandler(async (req, res) => {
    //get data from frontend
    //validation
    //check if user exists
    //confirm password
    //return if correct information
    const {username, email, password} = req.body;
    if (!(username || email)) {
        throw new ApiError(400, "Please provide your username or email");
    }

    const user = await User.findOne({$or: [{username}, {email}]});
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if(!isPasswordCorrect) {
        throw new ApiError(400, "Invalid credentials");
    }

    const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id);

    const loggedUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(200).cookie("refreshToken", refreshToken, OPTIONS).cookie("accessToken", accessToken, OPTIONS).json(new ApiResponse(200, {user: loggedUser, accessToken, refreshToken}, "User logged in successfully"));

})

export {
    register,
    login
}