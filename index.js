import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors';
import dotenv from 'dotenv'

import userRoutes from './routes/userData.js'
const app = express();
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());
app.use(express.json());
app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello to projectServer API');
})

const { DB_URI } = process.env;

const CONNECTION_URL = DB_URI;
const PORT = process.env.PORT || 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((error) => console.log(error))
