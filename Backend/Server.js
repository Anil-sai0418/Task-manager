const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors');         
const User = require('./models/user'); 
const bcrypt = require('bcrypt');
const Task = require('./models/task');
const transation = require('./models/transation');
const TransactionModel = require('./models/transation');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// CORS Configuration - Allow your Vercel frontend
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://task-manager-anil.vercel.app'
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); 
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));


mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000,
})
.then(() => console.log("✅ MongoDB is connected successfully!"))
.catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
    console.error("Please check:");
    console.error("1. Your internet connection");
    console.error("2. MongoDB Atlas IP whitelist settings");
    console.error("3. Your cluster is running (not paused)");
    console.error("4. Your connection string is correct");
}); 


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const user = await User.findOne({ email });
        if (!user) 
            return res.status(404).json({ message: "Email not found" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(403).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



app.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            setTimeout(() => {
                res.status(400).json({ message: "User already exists" });
            }, 3000);
            return;
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ email, password: hashedPassword, name });
        await newUser.save();

        res.status(200).json({
            message: "Successfully registered",
            token: "mock-token-435",
            user: {
                name: newUser.name,
                email: newUser.email,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        
    }
});


//  add a post by using + button
app.post('/create-task', async (req, res) => {
    try {
        const { name, amount, date, time , userId } = req.body;

        if (!name || !amount || !date || !time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTask = new Task({
            name,
            amount,
            date,
            time,
            userId
        });

        await newTask.save();

        // Create initial credit transaction for the task
        await TransactionModel.create({
            name: name,
            amount: amount,
            date: date,
            time: time,
            taskId: newTask._id,
            type: "credit"
        });

        res.status(201).json({
            message: "Task created successfully",
            task: newTask
        });

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// this comes based on the task id, includes transaction totals per task
app.get('/get-task/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const tasks = await Task.find({ userId: userId });

        // Return empty array for new users - this is not an error!
        if (!tasks || tasks.length === 0) {
            return res.status(200).json({
                message: "No tasks yet",
                tasks: []
            });
        }

        const enrichedTasks = await Promise.all(
            tasks.map(async (task) => {
                const transactions = await TransactionModel.find({ taskId: task._id });

                const credit = transactions
                    .filter(tx => tx.type === "credit")
                    .reduce((sum, tx) => sum + tx.amount, 0);

                const debit = transactions
                    .filter(tx => tx.type === "debit")
                    .reduce((sum, tx) => sum + tx.amount, 0);

                return {
                    ...task.toObject(),
                    credit,
                    debit,
                    balance: credit - debit
                };
            })
        );

        res.status(200).json({
            message: "Tasks fetched successfully",
            tasks: enrichedTasks
        });
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// update task based on task id and full data
app.put('/update-task', async (req, res) => {
  try {
    const { _id, name, amount, date, time } = req.body;

    if (!_id || !name || !amount || !date || !time) {
      return res.status(400).json({ success: false, message: "All fields (_id, name, amount, date, time) are required" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      { name, amount, date, time },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ success: false, message: "Server error while updating task" });
  }
});

// delete task based on task id
// DELETE task by name (you can also do by ID if preferred)
app.delete('/delete-task', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: "Task name is required" });
    }

    const result = await Task.findOneAndDelete({ name });

    if (!result) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// credit transation

app.post('/credit-transaction', async (req, res) => {
    try {
        const { name, amount, date, time,  taskId} = req.body;

        const newData = {
            name:name,
            amount:amount,
            date : date,
            time : time,
            taskId:taskId,
            type: "credit"
        }
        const data = await TransactionModel.create(newData)
        if (data) {
            res.status(201).json({
                success : true,
                message: "Task created successfully"
            });
        }

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error" , success : false});
    }
});

// debit transation

app.post('/debit-transaction', async (req, res) => {
    try {
        const { name, amount, date, time,  taskId} = req.body;

        const newData = {
            name:name,
            amount:amount,
            date : date,
            time : time,
            taskId:taskId,
            type: "debit"
        }
        const data = await TransactionModel.create(newData)
        if (data) {
            res.status(201).json({
                success : true,
                message: "Task created successfully"
            });
        }

    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error" , success : false});
    }
});


// Get all transactions (credit + debit) for a given taskId
app.get('/transactions/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;

        const transactions = await TransactionModel.find({ taskId }).populate("taskId")

        // Return empty array for new tasks - this is not an error!
        if (!transactions || transactions.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No transactions yet",
                transactions: []
            });
        }

        res.status(200).json({
            success: true,
            message: "Transactions fetched successfully",
            transactions
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
});


// logout route (for frontend to hit and clear localStorage)
app.post('/logout', (req, res) => {
    // In JWT-based auth, logout is handled on client-side by clearing token
    res.status(200).json({ message: "Logged out successfully" });
});


// Get profile by user ID
app.get('/get-profile/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Update user profile
app.put('/update-profile', async (req, res) => {
    const { userId, name, phone, address, profileImage } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, phone, address, profileImage },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


// Delete a transaction by ID
app.delete('/transaction/:id', async (req, res) => {
    try {
        await TransactionModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Transaction deleted successfully" });
    } catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ success: false, message: "Server error while deleting transaction" });
    }
});

// Update a transaction by ID
app.put('/transaction/:id', async (req, res) => {
    try {
        const { name, amount, date, time } = req.body;
        
        if (!name || !amount || !date || !time) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        
        const updatedTransaction = await TransactionModel.findByIdAndUpdate(
            req.params.id,
            { name, amount, date, time },
            { new: true }
        );
        
        if (!updatedTransaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }
        
        res.status(200).json({ success: true, message: "Transaction updated successfully", transaction: updatedTransaction });
    } catch (error) {
        console.error("Error updating transaction:", error);
        res.status(500).json({ success: false, message: "Server error while updating transaction" });
    }
});

// Health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'success', 
        message: 'Task Manager API is running!',
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'healthy', 
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server is running on port ${PORT}`);
});