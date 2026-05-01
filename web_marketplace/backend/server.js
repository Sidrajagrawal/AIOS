import express from 'express'
import connectDB from './model/index.js';
import cors from 'cors'
import router from './routes/index.js';
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const MONGO_URL = process.env.MONGO_URL;

connectDB(MONGO_URL);

app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))

//BASE API
app.use('/api', router)

//Test API
app.get('/', (req, res) => {
    res.send('Hello World');
})


app.listen(8080, () => {
    console.log("Server running at 8080");
})
