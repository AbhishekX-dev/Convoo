import User from "../models/user.model.js"
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";

export const signup = async (req,res)=>{
    try {
    const {fullName,password,email} =req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "fullName, email and password are required" });
    }
    if(password.length <6) {
        return res.status(400).json({ message : "Password must be atleast 6 char"});
    }
    const user= await User.findOne({email});
    if(user) {
        return res.status(400).json({message :"Email already exist"});
    }
    const salt= await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password,salt);

    const newUser= new User({
        fullName,
        email,
        password :hashedPassword,
        profilePic : req.body.profilePic || " ",
    })
 
    if(newUser){
        generateToken(newUser._id,res);
        await newUser.save();
        res.status(201).json({
            _id :newUser._id,
            fullName :newUser.fullName,
            email :newUser.email,
           profilePic :newUser.profilePic,
            
        });
    }else{
        res.status(400).json({message :"Error occured :Invalid user details"}) 

    }

         
    } catch (error) {
        res.status(500).json({message :"Server error",error: error.message});
        
    }



    

}

export const login = async (req,res)=>{
    try{
    const {email,password} =req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "email and password are required" });
      }
    const user= await User.findOne({email});
    if(!user) {
        return res.status(400).json({message :"Invalid credentials"});
    }
    const isPasswordCorrect =await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        return res.status.json({message :"Invalid credentials"});
    }
    generateToken(user._id,res);

    res.status(200).json({
        _id :user._id,
        fullName :user.fullName,
        email :user.email,
        profilePic :user.profilePic,

    });
}catch (error) {  
      res.status(500).json({message :"Server error",error: error.message});
}
}

export const logout =(req,res)=>{
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message :"Logged out successfully"});
    
  } catch (error) {
    res.status(500).json({message :"server error" ,error : error.message});
    
  }
}

export const updateProfile = async (req,res)=>{
    
}