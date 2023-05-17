import express from 'express';
const app = express();
import env from './config/environment.js';
import router from './routes/index.js';
import db from './config/mongoose.js';
import path from 'path';
import cors from 'cors'

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json());
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/', router);

app.listen(env.port, (err)=>{
    err ? console.log('Error while starting server :', err) : console.log("Server is running at http://localhost:"+env.port);
})