const express=require('express')
const router=express.Router()
const authController=require("../controllers/Auth")
const { verifyToken } = require('../middleware/VerifyToken')
const sendEmail = require("../utils/Emails");


router
    .post("/signup",authController.signup)
    .post('/login',authController.login)
    .post("/verify-otp", authController.verifyOtp)
    .post("/resend-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Call your sendEmail function
    await sendEmail(
      email,
      "Your OTP Code",
      `Your OTP is ${otp}. It will expire in 10 minutes.`
    );

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
})
    .post("/forgot-password",authController.forgotPassword)
    .post("/reset-password",authController.resetPassword)
    .get("/check-auth",verifyToken,authController.checkAuth)
    .get('/logout',authController.logout)

    

module.exports=router