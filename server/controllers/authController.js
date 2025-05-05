import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemaler.js';
import adultModel from '../models/adultModel.js';
import {nanoid} from 'nanoid';
import RegistrationRequest from '../models/RegistrationRequest.js';


export const register = async (req, res) => {
    const { fullName, nic, email, phoneNo, address, password, gender, dob } = req.body;
  
    if (!fullName || !email || !password || !phoneNo || !address || !nic || !gender || !dob) {
      return res.json({ success: false, message: 'Please fill all the fields' });
    }
  
    try {
      const existingUser = await userModel.findOne({ nic });
  
      if (existingUser) {
        if (existingUser.role === 'Adult') {
          const adultData = await adultModel.findOne({ userId: existingUser.userId });
  
          if (adultData && adultData.guardianId) {
            const guardian = await userModel.findOne({ userId: adultData.guardianId });
  
            if (guardian) {
              // ✅ Update existing adult user
              existingUser.email = email;
              existingUser.phoneNo = phoneNo;
              existingUser.password = await bcrypt.hash(password, 10);
              existingUser.status = 'Inactive';
              existingUser.isVerified = false;
              await existingUser.save();
  
              // ✅ Save Registration Request
              await RegistrationRequest.create({
                adultUserId: existingUser.userId,
                guardianUserId: guardian.userId,
                status: 'Pending',
              });
  
              // ✅ Send Email to Guardian
              const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: guardian.email,
                subject: 'Adult Registration Attempt Notification – Elder Bliss',
                text: `Dear ${guardian.fullName},
  
  We noticed that the adult registered under your care (${existingUser.fullName}) has attempted to register on the Elder Bliss platform independently.
  
  If you wish to confirm and allow this registration, please log in to your profile and accept the registration request shown in your dashboard.
  
  If this was not expected, you can safely ignore this message.
  
  Thank you,  
  The Elder Bliss Team  
  www.elderbliss.com`,
              };
  
              await transporter.sendMail(mailOptions);
  
              return res.json({ success: false, message: 'Adult already exists. Guardian has been notified.' });
            }
          }
        }
        // ✅ Default case if user exists but not a pre-registered adult
        return res.json({ success: false, message: 'User already exists' });
      }
  
      // ✅ No existing user => Create a new user normally
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = nanoid(12);
  
      const newUser = await userModel.create({
        userId,
        fullName,
        nic,
        email,
        phoneNo,
        address,
        gender,
        dob,
        password: hashedPassword,
        role: 'User',
        status: 'Active',
        isVerified: true,
      });
  
      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      // ✅ Send Welcome Email
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Welcome to Elder Bliss – Caring for Your Loved Ones',
        text: `Hello ${fullName},
  
  Welcome to Elder Bliss! We are delighted to have you as part of our community dedicated to providing compassionate care and support for elderly individuals.
  
  At Elder Bliss, we ensure peace of mind for families by offering top-quality adult care services, including medical assistance, caregiver support, and essential well-being solutions. Whether it's health monitoring, caregiver visits, or personalized care plans, we are here for you.
  
  If you have any questions or need assistance, feel free to reach out. We look forward to serving you and making a meaningful impact in your life.
  
  Warm regards,  
  The Elder Bliss Team  
  www.elderbliss.com`,
      };
  
      await transporter.sendMail(mailOptions);
  
      return res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during registration:', error);
      return res.json({ success: false, message: error.message });
    }
  };
  

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

        if (user.status !== 'Active') {
            return res.json({success: false, message: 'Your account is not active. Please contact support.'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({success: false, message: 'Invalid Password'});
        }

        const token = jwt.sign({id:user.userId}, process.env.JWT_SECRET, {expiresIn: '7d'});

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
        const user = await userModel.findOne({userId}); 
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

        const user = await userModel.findOne({userId});

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

        user.resetOtpExpireAt = Date.now() + 5 * 60 * 1000;

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

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
  
    console.log('Request Body:', req.body); // Log the request payload
  
    if (!email || !otp || !newPassword) {
      return res.json({ success: false, message: 'Please fill all the fields' });
    }
  
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: 'User not found' });
      }
  
      console.log('User:', user); // Log the user document
  
      if (user.resetOtp !== otp || user.resetOtp === '') {
        return res.json({ success: false, message: 'Invalid OTP' });
      }
  
      if (user.resetOtpExpireAt < Date.now()) {
        return res.json({ success: false, message: 'OTP expired' });
      }
  
      user.password = await bcrypt.hash(newPassword, 10);
      user.resetOtp = '';
      user.resetOtpExpireAt = 0;
      await user.save();
  
      return res.json({ success: true, message: 'Password has been reset successfully' });
    } catch (error) {
      console.error('Error:', error); // Log the error
      return res.json({ success: false, message: error.message });
    }
  };
  






