const jwt = require('jsonwebtoken')

const AuthMiddleware = async(req,res,next)=>{
      try {
          const headers = req.header('Authorization');
          const token = headers.split(" ")[1];

          const body = jwt.verify(token,process.env.JWTPRIVATEKEY);

          if(body){
              req.userId = body.id;
              next();
          }else{
            res.json({msg:"Authorization Failed!!!"})
          }
      } catch (error) {
          res.json({msg:error.message})
      }
}

module.exports =  AuthMiddleware;