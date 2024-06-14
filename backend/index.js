const cors = require("cors")
const express = require("express")
const multer = require("multer")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const proRoute = require("./routes/product")
const app = express();


dotenv.config()
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}))

app.use("/connect/products", proRoute)


app.listen(process.env.PORT || 5000, ()=>{console.log("Backend server is awake!")})
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("db connected successfully")).catch((error)=>{console.log(error)})