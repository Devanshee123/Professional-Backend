import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asynchandler";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";

try {
    export const verifyJWT = asyncHandler(async(req, res, next) => {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
        if(!token){
            throw new ApiError(401, "Unautorized request")
        }
    
        const decodedToken = jwt.verify(token, proccess.env.ACCESS_TOKEN_SECRET)
    
        await User.findById(decodedToken?._id).select
        ("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
    
    })
} catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
}