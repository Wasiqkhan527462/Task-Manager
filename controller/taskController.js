const Task = require('../model/taskModel');
const catchHandler = require('express-async-handler');

const getAlltasks = catchHandler(async(req, res) => {
    const task = await Task.find()
    res.status(200).json({
        status: "Sucess",
        length: task.length,
        data: task
    })
})

const gettask = catchHandler(async(req, res) => {
    const task = await Task.findById(req.params.id)
    if(!task){
        res.status(404).json({
            status: `No task found with ID: ${req.params.id}`
        })
    }
    res.status(200).json({
        status: "Success",
        data: task
    })
})

const createtask = catchHandler(async(req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({
        status: "Sucess",
        data: task
    })
})

const updatetask = catchHandler(async(req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true
    })
    if(!task){
        res.status(404).json({
            status: `No task found with ID: ${req.params.id}`
        })
    }
    res.status(200).json({
        status: "Sucess",
        data:task
    })
})

const deletetask = catchHandler(async(req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task){
        res.status(404).json({
            status: `No task found with ID: ${req.params.id}`
        })
    }
    res.status(200).json({
        status: "Task Deleted Successfully",
        data: task
    })
})

module.exports = {
    getAlltasks,
    gettask,
    updatetask,
    createtask,
    deletetask
}