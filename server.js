const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.MONGODB_URI, {
});

const Task = mongoose.model('Task', { title: String });

app.use(bodyParser.json());

app.use(express.static('public'));

// Get all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Add a new task
app.post('/tasks', async (req, res) => {
  const newTask = new Task({ title: req.body.title });
  await newTask.save();
  res.json(newTask);
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;
  const updatedTitle = req.body.title;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { title: updatedTitle }, { new: true });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
