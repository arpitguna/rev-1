const TaskModel = require('../models/TaskModel')

const { validationResult } = require('express-validator')

module.exports.ViewTask = async (req, res) => {
    try {
        let sort = 1
        if (req.query.sort) {
            sort = req.query.sort
        }

        let search = ''
        if (req.query.search) {
            search = req.query.search
        }

        let Task = await TaskModel.find({ taskname: { $regex: search } }).sort({ _id: parseInt(sort) })

        return res.status(200).json({ Task })
    }
    catch (err) {
        return res.status(400).json({ err })
    }
}

module.exports.AddTaskData = async (req, res) => {
    try {

        let error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(200).json({
                errorData: error.mapped(),
                oldData: req.body
            })
        }
        else {
            let AddTask = await TaskModel.create(req.body)

            if (AddTask) {
                return res.status(200).json({ msg: 'Task add TaskModel' })
            } else {
                return res.status(400).json({ msg: 'something wrong!!' })
            }
        }
    }
    catch (err) {
        return res.status(400).json({ err })
    }
}

module.exports.Delete = async (req, res) => {
    try {
        let DeleteTask = await TaskModel.findByIdAndDelete(req.query.id)
        if (DeleteTask) {
            return res.status(200).json({ msg: 'delete Task' })
        } else {
            return res.status(400).json({ msg: 'something wrong!!' })
        }
    }
    catch (err) {
        return res.status(400).json({ err })
    }
}

module.exports.Status = async (req, res) => {
    try {
        let ChangeStatus = await TaskModel.findByIdAndUpdate(req.query.id, { status: req.query.status })
        if (ChangeStatus) {
            return res.status(400).json({ msg: 'status chang succesfully' })
        } else {
            return res.status(400).json({ msg: 'something wrong!!' })
        }
    }
    catch (err) {
        return res.status(400).json({ err })
    }
}