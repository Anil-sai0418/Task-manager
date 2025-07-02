const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');         
const User = require('./models/user'); 
const bcrypt = require('bcrypt');


const app = express();

app.use(cors()); 
app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/taskmanagerApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB is connected"))
.catch(err => console.log("MongoDB error:", err)); 


app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({ email });
    if (!user) 
        return res.status(404).json({ message: "Email not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(403).json({ message: "Incorrect password" });
    }

    res.status(200).json({
        message: "Login successfully",                  
        token: "mock-token-321",
        user: {
            id: user._id,
            name: user.name,      
            email: user.email     
        }
    });
});



app.post('/register', async (req, res) => {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        setTimeout(()=>{ 
        return res.status(400).json({ message: "User already exists" });
         },3000);
    }
       const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, password:hashedPassword, name });
    await newUser.save();

    res.status(200).json({
        message: "Successfully registered",
        token: "mock-token-435",
        user: {
            name: newUser.name,
            email: newUser.email,
        }
    });
});

app.listen(8000, () => console.log("Server is running on http://localhost:8000"));
