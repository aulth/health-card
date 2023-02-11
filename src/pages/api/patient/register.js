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
    console.log(data);
    let userExist = await Patient.findOne({ email: data.email });
    if (userExist) {
        return res.json({ success: false, msg: "You're already registered" })
    }
    let newData = await Patient.create({
        name: data.name,
        email: data.email.toLowerCase(),
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
