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
    let {id} = jwt.verify(data.authtoken, process.env.JWT_SECRET);
    console.log(id);
    let newData = await Patient.findOneAndUpdate({_id:id}, {verified:true});
    console.log(newData)
    if(!newData){
        return res.json({success:false, msg:"Verification failed"});
    }
    return res.json({
        success:true, msg:'Verification Successfull'
    })
}
