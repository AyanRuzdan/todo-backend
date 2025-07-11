const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ priority: -1, createdAt: -1 })
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.post('/', async (req, res) => {
    const { text, priority } = req.body
    if (!text || typeof priority !== 'number') {
        return res.status(400).json({ message: 'Text and numeric priority are required' })
    }
    const newTask = new Task({ text, priority })
    try {
        const savedTask = await newTask.save()
        res.status(201).json(savedTask)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ message: "Task not found" })
        res.json({ message: "Task deleted", task })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
router.patch('/:id/complete', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return res.status(404).json({ message: "Task not found" })
        task.completed = !task.completed
        const updatedTask = await task.save()
        res.json(updatedTask)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
module.exports = router