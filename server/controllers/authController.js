import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemaler.js';


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.json({success: false , message: 'Please fill all the fields'});
    }

    try{
        const existingUser = await userModel.findOne({email});

        if(existingUser) {
            return res.json({success: false, message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000
        });
        // sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to our website',
            text: `Hello ${name}, Welcome to our website. We are glad to have you with us.`
        };

        await transporter.sendMail(mailOptions);

        return res.json({success: true, message: 'User registered successfully'});
 

    }catch(error) {
        console.error('Error:', error);
        return res.json({success: false, message: error.message});
    }

}

export const login = async(req , res)=>{
    const {email, password} = req.body;

    if(!email || !password) {
        return res.json({success: false, message: 'Please fill all the fields'});
    }

    try{
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success: false, message: 'Invalid Email'});
        } 

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({success: false, message: 'Invalid Password'});
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge : 7 * 24 * 60 * 60 * 1000
        });

        return res.json({success: true, message: 'User logged in successfully'});

    }catch(error) {
        console.error('Error:', error);
        return res.json({success: false, message: error.message});
    }
}


export const logout = async(req, res) => {
    try {
        res.clearCookie('token' ,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        
        return res.json({success: true, message: 'User logged out successfully'});
        
    }catch(error) {
        console.error('Error:', error);
        return res.json({success: false, message: error.message});
    }  

}

export const sendVerifyOtp = async(req, res) => {
    try{
        const {userId} = req.body;
        const user = await userModel.findById(userId); 
        // check if user is already verified

        if(user.isVerified) {
            return res.json({success: false, message: 'Account is already verified'});
        }

        const otp = String(Math.floor(100000 + Math.random() * 9000000));
        user.verifyOtp = otp;   // save otp in user document

        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            text: `Hello ${user.name}, Your account verification OTP is ${otp}`
        }
        await transporter.sendMail(mailOptions);

        res.json({success: true, message: 'Verification OTP SEnt on your email'});


    }catch(error) {
        console.error('Error:', error);
        return res.json({success: false, message: error.message});
    }
}

export const verifyEmail = async(req, res) => {
    try{
        const {userId, otp} = req.body;
      
        if(!userId || !otp) {
            return res.json({success: false, message: 'Please fill all the fields'});
        }

        const user = await userModel.findById(userId);

        if(!user) {
            return res.json({success: false, message: 'User not found'});
        }

        if(user.verifyOtp !== otp || user.verifyOtp === '') {
            return res.json({success: false, message: 'Invalid OTP'});
        }

        if(user.verifyOtpExpireAt < Date.now()) {
            return res.json({success: false, message: 'OTP expired'});
        }

        user.isVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        return res.json({success: true, message: 'Account verified successfully'});

    }catch(error) {
        console.error('Error:', error);
        return res.json({success: false, message: error.message});
    }
} 

export const isAuthenticated = async(req, res) => {
    try{
        return res.json({success: true, message: 'User is authenticated'});

    }catch(error) {
        console.error('Error:', error);
        return res.json({success: false, message: error.message});
    }
}

// send password reset otp

export const sendResetOtp = async(req , res) =>{
    const{email} = req.body

    if(!email){
        return res.json({success : false , message : 'Email is required'})

    }

    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success : false , message:'user not found'})
        }

        const otp = String(Math.floor(100000 + Math.random() * 9000000));
        user.resetOtp = otp;   // save otp in user document

        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password reset OTP',
            text: `Hello ${user.name}, Your otp for resetting password is ${otp} .
            Use this OTP to procced with resetting your password.`
        } 
        await transporter.sendMail(mailOptions);

        return res.json({success : true , message : 'OTP sent to your email'})


    }catch{
        return res.json({success : false , message : error.message})
    }
}

// reset user  password

export const resetPassword = async(req , res) =>{
    const {email , otp , newPassword} = req.body

    if(!email || !otp || !newPassword){
        return res.json({success : false , message : 'Please fill all the fields'})
    }

    try{
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success : false , message : 'User not found'})
        }

        if(user.resetOtp !== otp || user.resetOtp === ''){
            return res.json({success : false , message : 'Invalid OTP'})
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success : false , message : 'OTP expired'})
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;
        await user.save();

        return res.json({success : true , message : 'Password has been reset successfully'})

    }catch(error){
        return res.json({success : false , message : error.message})

    }
    
}