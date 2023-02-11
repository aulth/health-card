// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "middleware/connectToDb";
import Patient from "models/Patient";
var jwt = require('jsonwebtoken');
connectToDb();
export default async function handler(req, res) {
    if (req.method != 'POST') {
        return res.json({ success: false, msg: 'Method not allowed' });
    }
    const { data } = req.body;
    let newData = await Doctor.findOne({email:data.email});
    if(!newData){
        return res.json({success:false, msg:"Sorry, You're not registered"});
    }
    if(newData.password!=data.password){
        return res.json({success:false, msg:'Password incorrect'});
    }
    let authtoken = jwt.sign({email:newData.email, id:newData._id, name:newData.name}, process.env.JWT_SECRET);
    if(!authtoken){
        return res.json({
            success:false, msg:"Token generation failed"
        })
    }
    return res.json({
        success:true, authtoken: authtoken, msg:'Login Successfull', data:newData
    })
}
