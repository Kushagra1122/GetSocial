const userData = require("../model/user")
const otpData = require("../model/otp")
const bcrypt = require("bcrypt")


const JWT = require("jsonwebtoken");
const { sendEmailController } = require("../helper/Mail");
const generateOTP = require("../helper/OTP");
const register = async (req, res) => {
    try {
        const { name,email, username, password } = req.body;
       
     
        const user = await userData.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exit try different" });
        }
        const Email = await userData.findOne({ email});
        if (Email) {
            return res.status(400).json({ message: "Email already exit try different" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);



        await userData.create({
            name,
            username,
            email,
            password: hashedPassword,
          
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email|| !password) {
            return res.status(400).json({ message: "All fields are required" });
        };
        const user = await userData.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect username or password",
                success: false
            })
        };
        const otp = generateOTP()
        const hashedOtp = await bcrypt.hash(otp, 10);
        const newOtp=new otpData({
            otp: hashedOtp,
            userId: user._id,
        })
        await newOtp.save();

        sendEmailController(email,otp)


        return res.status(200).json({
            id:user._id,
            message: 'OTP_SENT',
        });
    } catch (error) {
        console.log(error);
    }
}
const otp =async(req,res)=>{
    const {otp}=req.body
    const id = req.params.id;

    console.log(otp,id)
    try {
       let find = await otpData.findOne({ userId: id });
        if (!find) {
            return res.status(404).json({
                message: "error",
            });
        }
        const check = await bcrypt.compare(otp, find.otp);
        console.log(check)
        if (!check){
            return res.status(401).json({
                message: "Invalid otp",
            });
        }
        else{
             const User=await userData.findById(id)
             if(!User){
                 return res.status(401).json({
                     message: "Error",
                 });
             }
            const token = await JWT.sign({ _id: User._id }, process.env.JWT_SECRET, {
                expiresIn: "7d",
            });
            return res.status(200).json({
                user: {
                    _id: User._id,
                    username: User.username,
                    name: User.name,
                    profile:User.photo,
                    about:User.about,
                    followers:User.followers,
                    following:User.following,
                    posts:User.posts,

                },

                token,



            });
             
        }

        
    } catch (error) {
        
    }
}

const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await userData.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}


module.exports = { register, login,otp, getOtherUsers }