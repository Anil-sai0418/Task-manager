const Task = require('../models/task');
const TransactionModel = require('../models/transation');

// Create Task
exports.createTask = async (req, res) => {
    try {
        const { name, amount, date, time, userId } = req.body;

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
};

// Get Tasks by User
exports.getTasks = async (req, res) => {
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
};

// Update Task
exports.updateTask = async (req, res) => {
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
};

// Delete Task
exports.deleteTask = async (req, res) => {
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
};
