/*const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {body, validationResult}= require("express-validator");
//CREATE A USER USING POST "api/auth/". Doesnt require auth
router.post("/",[
    body('password','Enter a valid password').isLength({min:3}),
    body('email','Enter a valid email').isEmail()

], (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  User.create({
    password: req.body.password,
    email: req.body.email,
  }).then(user=>res.json(user));
  

})
module.exports = router
*/

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = 'ShrutiisAGood$girl';
var fetchuser = require("../middleware/fetchuser");
// ROUTE1:Route for creating a user
router.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Enter a valid password").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //check whether a user with this email already exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass= await bcrypt.hash(req.body.password,salt);
      const newUser = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user:{
          id: newUser.id
        }
      }
      const authToken = jwt.sign(data,JWT_SECRET);
      console.log(authToken);
      res.json(authToken);
    } catch (error) {
      if (error.code === 11000) {
        // Duplicate key error
        return res.status(400).json({ error: "Email already exists" });
      }
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);
//ROUTE2:authenticate a user: POST "api/auth/login". No login required
router.post("/login",[
  body('email','enter a valid email').isEmail(),
  body("password", "Enter a valid password")
], async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
const {email,password}= req.body;
try{
let user = await User.findOne({email});
if(!user){
  return res.status(400).json({error:"Please try to login with correct credentials"});
}
const passwordCompare = await bcrypt.compare(password, user.password);
if(!passwordCompare){
  return res.status(400).json({error:"Please try to login with correct credentials"});
}
const data = {
  user:{
    id: user.id
  }
}
const authToken = jwt.sign(data,JWT_SECRET);
res.json(authToken);

}
catch(error){
  console.error(error);
  res.status(500).json("Internal Server error");
}

});
//Route 3: Get LoggedIn user Details using POST request "/api/auth/getuser". login required
// router.post("/getuser",fetchuser,async(req,res)=>{
// try{
//   userId = req.user.id;
// const user = await User.findById(userId).select("-password");
// res.send(user);
// }
// catch(error){
// console.error(error.message);
// res.status(500).json("Internal server error");
// }
// });
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    
    userId = req.user;
   console.log({userId})
    const user = await User.findById(userId.user).select("-password");
    res.send(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
