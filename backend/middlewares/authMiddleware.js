import  jwt  from "jsonwebtoken";
import User from '../models/user.js';

export const authmiddleware = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            // Extract token from the authorization header
            token = req.headers.authorization.split(" ")[1];
            try {
                const decode = jwt.verify(token, process.env.JWT);
                req.user = await User.findById(decode.id).select('-password');
             
                next();
            } catch (error) {
                res.status(401).json({ message: "Not authorized",error:error });
            }
        } else {
            res.status(401).json({ message: "Token not present, authorization failed" });
        }
    } catch (error) {
        console.error("Error while authenticating:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
