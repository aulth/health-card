import mongoose from 'mongoose'
const PatientSchema  = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    desease: Array
},{timestamps:true})

mongoose.models={};
export default mongoose.model('Patient', PatientSchema);