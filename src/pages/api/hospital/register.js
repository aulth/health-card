// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectToDb from "middleware/connectToDb";
import Hospital from "models/Hospital";
var jwt = require('jsonwebtoken');
connectToDb();
export default async function handler(req, res) {
    if (req.method != 'POST') {
        return res.json({ success: false, msg: 'Method not allowed' });
    }
    const { data } = req.body;
    console.log(data);
    let userExist = await Hospital.findOne({ email: data.email });
    if (userExist) {
        return res.json({ success: false, msg: "You're already registered" })
    }
    let newData = await Hospital.create({
        name: data.name,
        email: data.email.toLowerCase(),
        address:data.address,
        city:data.city,
        state:data.state,
        pinCode:data.pinCode,
        password: data.password,
        verified: false,
    })
    console.log(newData);
    if (!newData) {
        return res.json({ success: false, msg: 'Registration failed' });
    }
    let authtoken = jwt.sign({ email: newData.email, id: newData._id, name: newData.name }, process.env.JWT_SECRET);
    if (!authtoken) {
        return res.json({
            success: false, msg: "Token generation failed"
        })
    }
    return res.json({
        success: true, authtoken: authtoken, msg: 'Registration successfull'
    })
}
