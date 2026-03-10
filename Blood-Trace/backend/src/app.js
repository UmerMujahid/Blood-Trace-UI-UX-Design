const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.route');

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" })); // allows server to read json bodies

app.use(express.urlencoded({ extended: true, limit: "16kb" })); // reads url parameters



app.use('/api/v1/user', userRouter); //  http://localhost:4000/api/v1/user


app.use("/api/v1", (req, res) => {
    return res.status(200).json({
        message: "Backend working fine."
    })
}) //  http://localhost:4000/api/v1


module.exports = app;