const User = require('../models/user.model');


const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(400).json({
            message: "All fields are required"
        });

        const existing = await User.findOne({ email: email.toLowerCase() });

        if (existing) return res.status(400).json({
            message: "This email is already in use"
        });

        const user = await User.create({
            name: name,
            email: email.toLowerCase(),
            password: password
        })

        return res.status(201).json({
            message: "User registered",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken: user.getAccessToken()
        });


    } catch (error) {
        console.log(`[ERROR]: Internal server error. ${error}`);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}



const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({
            message: "All fields are required"
        });

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) return res.status(400).json({
            message: "User not found"
        });

        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(400).json({
            message: "Invalid credentials"
        })

        return res.status(200).json({
            message: "Logged In",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken: user.getAccessToken()
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports = {
    registerUser,
    loginUser
};