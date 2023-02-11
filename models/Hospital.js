import mongoose from 'mongoose'
const HospitalSchema  = new mongoose.Schema({
    name:String,
    email:String,
    address:String,
    city:String,
    state:String,
    pinCode:String,
    password:String,
    verified:Boolean,
},{timestamps:true})

mongoose.models={};
export default mongoose.model('Hospital', HospitalSchema);