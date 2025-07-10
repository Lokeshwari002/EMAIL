const express=require('express')
const mysql=require('mysql2')



const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Kaviyazhini@09",
    database:"email"
})

db.connect((err)=>{
    if(err){
        console.log("Error in connecting to db",err)
    }
    else{
        console.log("successfully connected to database")
    }
})
module.exports=db;