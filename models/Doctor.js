import mongoose from 'mongoose'
const DoctorSchema  = new mongoose.Schema({
    name:String,
    email:String,
    hospital:String,
    designation:String,
    password:String,
    verified:Boolean,
},{timestamps:true})

mongoose.models={};
export default mongoose.model('Doctor', DoctorSchema);