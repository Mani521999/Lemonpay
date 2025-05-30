/** Package */
import mongoose from 'mongoose';

/** Models */
import UserTable from '../../Module/User/Models/users';

/** Library */
import { isEmpty } from '../../Services/library';


/** Verify auth token */
export const verifyToken = async (req, res, next) => {
    try {
        console.log("verifyTokenverifyTokenverifyTokenreq", req.url);
        const token = req.header('Authorization')?.split('Bearer ')?.join('');

        let decoding = new UserTable().decodejwt(token)
        console.log(decoding, 'decoding')

        let userDoc = await UserTable.findOne({ '_id': decoding.userId }); //deoding._id is null 
        if (isEmpty(userDoc)) {
            return res.status(401).json({ success: false, message: "Invalid Token" });
        } else if (userDoc.token.split('Bearer ').join('') !== token) {
            return res.status(401).json({ success: false, message: "Authentication failed. Your token is invalid or has expired. Please log in again" });
        }

        let data = { id: userDoc._id, email: userDoc.email, secretKey: userDoc.secretKey }
        req.user = data
        return next();
    } catch (err) {
        console.log("verifyToken-error", err.toString());
        try {
            const token = req.header('Authorization').split('Bearer ').join('');
            await UserTable.findOneAndUpdate({ 'token': token }, { $set: { token: "" } }, { new: true });
        } catch (e) {
            console.log("Authorization_err", e);
            return res.status(401).json({ success: false, message: "Authentication failed. Your token is invalid or has expired. Please log in again." });
        }
        return res.status(401).json({ success: false, message: "Authentication failed. Your token is invalid or has expired. Please log in again." });
    }
}
