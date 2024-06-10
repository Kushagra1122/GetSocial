const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const router1 = require("./router/user")



const app=express()

require("dotenv").config()


app.use(cors());

app.use(express.json())


app.use("/api/auth", router1)




mongoose
    .connect(process.env.URI, {

    })
    .then(() => {
        console.log("DB Connetion Successfull");
    })
    .catch((err) => {
        console.log(err.message);
    });
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Started at ${port}`)
    
})


