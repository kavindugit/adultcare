import userModel from '../models/userModel.js';


export const getUserData = async (req, res) => {
    try {
        const {userId} = req.body;
        const user = await userModel.findOne({userId});

        if(!user) {
            return res.json({success: false, message: 'User not found'});
        }

        res.json({
            success: true, 
            userData: {
                name: user.fullName,
                nic: user.nic,
                dob: user.dob,
                address: user.address,
                phoneNo: user.phone,
                gender : user.gender,
                email: user.email,
                isVerified: user.isVerified,
                isAdmin: user.isAdmin,
            }
        });
    
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}     