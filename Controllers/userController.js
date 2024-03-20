const zod = require('zod');
const User = require('../model/user')
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')


//user Sign up Controller with zod validation
const userSignupSchema = zod.object({
    username:zod.string().max(20).min(6),
    email:zod.string().email(),
    password:zod.string()
})
const SignupController = async(req,res)=>{
    try {
        const body = req.body; 
        const parse = userSignupSchema.safeParse(body)
        if(parse.success === false){
            res.status(403).json({msg:"error in either email , password or username"})
        }
         const existingUser = await User.findOne({email:body.email})

         if(existingUser){
             res.status(403).json({msg:"user already exists try with different email"})
         }
         const SALT = await bcrypt.genSalt(10);
         const HashPass = await bcrypt.hash(body.password,SALT)
         await User.create({
            ...body,
            password:HashPass
         })
         res.status(200).json({msg:"user Created Successfully!!!"})
    } catch (error) {
        res.json({msg:error.message})
    }
};

//user signin with zod validation
const userSigninSchema = zod.object({
    email:zod.string().email(),
    password:zod.string()
})
const SigninController = async(req,res)=>{
    try {
        const body = req.body;    
        const parse = userSigninSchema.safeParse(body)

        if(parse.success === false){
            res.status(403).json({msg:"error in either email , password or username"})
        }

         const existingUser = await User.findOne({email:body.email})

        if(!existingUser){
            res.status(403).json({msg:"user with the email doesn't exist"})
        }
        
        const com = await bcrypt.compare(body.password,existingUser.password)
         console.log(com)
        if(!com){
            res.status(403).json({msg:"incorrect password!!!"})
        }

        const token = JWT.sign({id:existingUser._id},process.env.JWTPRIVATEKEY,{expiresIn:'2d'})

        res.status(200).json({msg:`${existingUser.username} welcome to the wonderful world...`,token})
    } catch (error) {
        res.json({msg:error.message})
    }
}


//Forgot password functionality
const ForgetPasswordController =  async (req, res) => {
    try {
        const email = req.body.email;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ msg: "User does not exist. Please try using a different email." });
        }
        
        const header = req.headers['authorization'];
        const token = header.split(" ")[1];

        res.status(200).json({link:`http://localhost:5000/api/v1/user/resetPassword/${token}`});

    } catch (error) {
        res.json({ msg: error.message });
    }
}

//Reset password functionality
const ResetPasswordController = async (req, res) => {
    try {
        const {  token } = req.params;
        const { password } = req.body;

        if ( !token || !password) {
            return res.status(400).json({ msg: "Missing parameters. Please provide userId, token, and password." });
        }

        const decoded = JWT.verify(token, process.env.JWTPRIVATEKEY);
        
        if (!decoded) {
            return res.status(401).json({ msg: "Unauthorized. Invalid token or userId." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
         console.log(hashPassword)
         let respo = await User.findByIdAndUpdate({ _id: decoded.existingUser._id },{password:hashPassword});
        if(respo){
            res.json({ msg: "Password has been updated successfully." });
        }else{
            res.json({msg:"password update failed!!!"})
        }
    } catch (error) {
        console.error("Error in resetPassword route:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

module.exports = {SignupController , SigninController , ForgetPasswordController , ResetPasswordController}