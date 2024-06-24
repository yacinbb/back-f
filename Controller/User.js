const User = require("../models/User");
const { registerValidator, loginValidator } = require("../utililites/validator");
const bcrypt = require("bcryptjs")
const Jwt = require("jsonwebtoken")
const getUsers = async (req,res) =>{
    try {
    const users = await User.find()
    return res.json(users)
    }catch (error) {
        console.log(error);
        return res.json(error);
}
}

const registerUser = async(req,res)=> {
    try {
const {firstName , lastName ,email , password , role} = req.body 
const validator = registerValidator.validate(req.body , { abortEarly: false,})
if (validator.error){
return res.json(validator.error)
} 
const userExist = await User.findOne({ email })

if (userExist){
    return res
    .status(401)
    .json({ error: "An account with this email already exist" });
}
const salt = await bcrypt.genSalt(10)
const hashedpassword = await bcrypt.hash(password ,salt)
const newUser =  new User({
    ...req.body, 
    password: hashedpassword
    })
    await newUser.save()
    newUser.password = undefined
res.json({ message: "Account successfully created", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const loginUser = async(req, res)=>{
    try {
    const {email , password} = req.body
    const validator = loginValidator.validate(req.body , {abortEarly: false})
    if (validator.error){
    return res.json(validator.error) 
    }
    const userExist = await User.findOne({email})
    if (!userExist){
    return res.status(401).json({ error: "Wrong email and/or password" });
    }
    const passEquals = await bcrypt.compare(password , userExist.password)
    if (!passEquals) {
    return res.status(401).json({ error: "Wrong email and/or password" });
    }
    userExist.password = undefined;
    const token = Jwt.sign({userId: userExist._id} , process.env.SECRET_JWT , {expiresIn: "1d"})
    res.json({
      message: `hi ${userExist.firstName}`,
      userExist,
      token
    });

    }catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
}

module.exports = {getUsers , registerUser , loginUser}