const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));


app.use("/api/v1",(req, res)=>{
    return res.status(200).json({
        message: "Backend working fine."
    })
})

module.exports = app;