const userRoute = require('express').Router();
const {SignupController,SigninController , ForgetPasswordController, ResetPasswordController} = require('../Controllers/userController')


userRoute.post('/SignUp',SignupController);
userRoute.post('/signin',SigninController);
userRoute.post('/forgetPassword',ForgetPasswordController);
userRoute.post('/resetpassword/:token',ResetPasswordController);

module.exports = userRoute;