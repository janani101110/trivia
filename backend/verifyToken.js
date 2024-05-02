const jwt= require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({error:'You are not Authenticated! '});
    } 
    jwt.verify(token,process.env.SECRET_KEY,async (err, data)=>{
        if(err){
            return res.status(403).json({error:"Token is not valid"})
        }
        req.userId=data._id
       // console.log("passed")
        next()
    })
}

module.exports=verifyToken