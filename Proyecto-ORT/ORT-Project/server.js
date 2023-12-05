import express from "express"
import dotenv from "dotenv"
import router from "./routes/index.js"
//import "./spreadsheet.js"
import fetch from "node-fetch"


import cors from "cors"







dotenv.config()

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/", router)
const server = app.listen(process.env.PORT, () => console.log('server up en puerto', process.env.PORT))
server.on('error', (err) => {
    console.log('ERROR =>', err);
});
