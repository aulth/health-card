import mongoose from 'mongoose'
const connection = {};
let mongodburl = process.env.mongodburl
mongoose.set("strictQuery", false);
const connectToDb = async ()=>{
    if(connection.isConnected){
        console.log("Using existed connection")
        return connection.isConnected;
    }
    const db = await mongoose.connect(`${mongodburl}`)
    connection.isConnected = db.connections[0].readyState;

}
export default connectToDb;