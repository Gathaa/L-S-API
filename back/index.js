const express = require('express')
const app =express()
const Model = require("./Model/User")
const cors = require('cors');
const jwt = require('jsonwebtoken')
app.use(cors());
app.use(express.json());const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Bilel")
app.get('/msg',(req,res)=>{
    res.send("Welcome To Authentication !");
    
});
app.post('/insert', async (req, res) => {
    try {
        const { Username, Email, Password } = req.body;
        
        if (!Username || !Email || !Password) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const existingUser = await Model.findOne({ Email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email Already Exists!' });
        }

        const newUser = new Model({
            Username,
            Email,
            Password
        });
        
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const User = await Model.findOne({
        Email: req.body.Email,
        Password: req.body.Password,
    });

    if (User) {
        const token = jwt.sign({
            Email: User.Email,
            Password: User.Password,
        }, "SecretToken");

        return res.json({ status: "ok", User: token });
    } else {
        return res.json({ status: "Error Occurred. User Not Found!", User: false });
    }
});

const port = 4000;
app.listen(port , ()=>{
    console.log(`Server Is Running On Port ${port}`)
});
