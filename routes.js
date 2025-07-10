const express=require('express');
const router=express.Router();
const{sendMail}=require('./email');
const db=require('./dbConfig')


router.get("/",(req,res)=>{
    return res.send("backend is running successfully")
})

router.post("/send-mail-otp",async(req,res)=>{
    const{email}=req.body
    
    if(!email){
        return res.json("email is required")
    }
    const generateOtp=()=>Math.floor(100000+Math.random()*900000);
    const otp=generateOtp();

    const expires_at=new Date(Date.now()+10*60000)

    db.query("insert into otp_codes(email,otp,expires_at)values(?,?,?)",[email,otp,expires_at],async(err,results)=>{
        if(err){
            return res.json(err)
        }
        await sendMail(email,otp)
        res.json("otp sent to email")
    })
})


// verify otp
router.post("/verify-otp",async(req,res)=>{
    const{email,otp}=req.body;
    db.query("select email,otp from otp_codes where email=? and otp=? order by id desc limit 1",[email,otp],(err,results)=>{
       if(err){
        return res.json(err)
       } if(results.length===0){
            return res.json("invalid otp")
        }
        const record=results[0]
        if(new Date>new Date(record.expired_at)){
            return res.json("otp expired")
        }
        return res.json({message:"Otp verified successfully"})

    })
})

module.exports=router;