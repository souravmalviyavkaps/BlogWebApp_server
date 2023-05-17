import mongoose from 'mongoose'
import env from './environment.js'

mongoose.connect(
  'mongodb+srv://souravmalviya:souravmalviya11@cluster0.hbdeq0e.mongodb.net/' +
    env.db
)
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to DB'));

db.once('open', ()=>{
    console.log("Connection to DB successful");
})

export default db;